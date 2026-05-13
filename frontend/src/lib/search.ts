import { Product } from "./products";

/**
 * Maximum number of search results to display
 */
export const MAX_RESULTS = 10;

/**
 * Search products locally using flexible matching across multiple fields
 * @param query - Search query string
 * @param products - Array of products to search
 * @returns Array of matching products (deduplicated and limited to MAX_RESULTS)
 */
export function searchProductsLocal(query: string, products: Product[]): Product[] {
  // Return empty array for empty or whitespace-only queries
  if (!query || query.trim().length === 0) {
    return [];
  }

  // Handle null or undefined products array
  if (!products || !Array.isArray(products)) {
    console.warn("searchProductsLocal: Invalid products array provided");
    return [];
  }

  const startTime = performance.now();
  const lowerQuery = query.toLowerCase().trim();
  const matchedProducts = new Set<string>(); // Use Set to deduplicate by product ID
  const results: Product[] = [];

  for (const product of products) {
    const productId = String(product.id);

    // Skip if already matched (deduplication)
    if (matchedProducts.has(productId)) {
      continue;
    }

    // Check if query matches any field (case-insensitive partial matching)
    const matchesName = product.name.toLowerCase().includes(lowerQuery);
    const matchesCategory = product.category.toLowerCase().includes(lowerQuery);
    const matchesDescription = product.description.toLowerCase().includes(lowerQuery);

    if (matchesName || matchesCategory || matchesDescription) {
      matchedProducts.add(productId);
      results.push(product);

      // Limit results to MAX_RESULTS
      if (results.length >= MAX_RESULTS) {
        break;
      }
    }
  }

  const endTime = performance.now();
  const duration = endTime - startTime;

  // Log warning if search takes longer than 500ms
  if (duration > 500) {
    console.warn(`Search took ${duration.toFixed(2)}ms, which exceeds the 500ms threshold`);
  }

  return results;
}

/**
 * Backend API response interface
 */
interface SearchAPIResponse {
  success: boolean;
  results: any[];
  count: number;
  message?: string;
}

/**
 * Configuration for API search retry logic
 */
const API_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  timeout: 5000, // 5 seconds
};

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Normalize backend Product model to frontend Product interface
 */
function normalizeBackendProduct(backendProduct: any): Product {
  return {
    id: String(backendProduct._id || backendProduct.uuid || ''),
    name: backendProduct.name,
    image: backendProduct.images?.[0]?.url || '',
    price: `₹${backendProduct.price}`,
    priceValue: backendProduct.price,
    category: backendProduct.category,
    description: backendProduct.description,
    trending: false, // Backend doesn't have trending field
  };
}

/**
 * Search products using backend API with retry logic and exponential backoff
 * @param query - Search query string
 * @returns Promise resolving to array of matching products
 */
export async function searchProductsAPI(query: string): Promise<Product[]> {
  // Return empty array for empty queries
  if (!query || query.trim().length === 0) {
    return [];
  }

  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < API_CONFIG.maxRetries; attempt++) {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

      // Make API request
      const response = await fetch(
        `/api/products/search?q=${encodeURIComponent(query)}`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      // Handle non-OK responses
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data: SearchAPIResponse = await response.json();

      // Handle API-level errors
      if (!data.success) {
        throw new Error(data.message || 'API search failed');
      }

      // Normalize backend products to frontend interface
      return data.results.map(normalizeBackendProduct);

    } catch (error) {
      lastError = error as Error;

      // Don't retry on abort (timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn(`API search timeout on attempt ${attempt + 1}`);
      } else {
        console.warn(`API search error on attempt ${attempt + 1}:`, error);
      }

      // If not the last attempt, wait with exponential backoff
      if (attempt < API_CONFIG.maxRetries - 1) {
        const delay = API_CONFIG.initialDelay * Math.pow(2, attempt);
        await sleep(delay);
      }
    }
  }

  // All retries failed
  console.error('API search failed after all retries:', lastError);
  throw lastError || new Error('API search failed');
}

/**
 * Configuration for search behavior
 */
export const SEARCH_CONFIG = {
  useAPI: false, // Toggle to enable/disable API search
  fallbackToLocal: true, // Fall back to local search on API errors
};

/**
 * Unified search interface that routes to local or API search with fallback
 * @param query - Search query string
 * @param products - Array of products for local search fallback
 * @param useAPI - Whether to use API search (default: from SEARCH_CONFIG)
 * @returns Promise resolving to array of matching products
 */
export async function searchProducts(
  query: string,
  products: Product[] = [],
  useAPI: boolean = SEARCH_CONFIG.useAPI
): Promise<Product[]> {
  // Return empty for invalid queries
  if (!query || query.trim().length === 0) {
    return [];
  }

  // If API search is disabled, use local search
  if (!useAPI) {
    return searchProductsLocal(query, products);
  }

  // Try API search with fallback to local on error
  try {
    return await searchProductsAPI(query);
  } catch (error) {
    console.error('API search failed, falling back to local search:', error);
    
    // Fall back to local search if enabled
    if (SEARCH_CONFIG.fallbackToLocal) {
      return searchProductsLocal(query, products);
    }
    
    // If fallback is disabled, return empty results
    return [];
  }
}
