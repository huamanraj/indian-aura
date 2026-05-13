import { type Product } from "./products";

// Use different URL for server-side vs client-side
const getApiUrl = () => {
  // Server-side: use localhost or environment variable
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  }
  // Client-side: use environment variable or relative path
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

// Transform backend product to frontend format
const transformProduct = (p: any): Product => ({
  id: String(p._id ?? p.uuid ?? ''),
  name: p.name,
  image: p.images?.[0]?.url || '/image1.jpeg',
  price: `₹${p.price?.toLocaleString() || p.price}`,
  priceValue: p.price,
  category: p.category,
  description: p.description,
  trending: false,
});

export async function fetchProducts(): Promise<Product[]> {
  try {
    const API_URL = getApiUrl();

    const response = await fetch(`${API_URL}/products`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const backendProducts = await response.json();
    return backendProducts.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
}

export async function fetchProductById(id: string | number): Promise<Product | undefined> {
  try {
    const API_URL = getApiUrl();
    const response = await fetch(`${API_URL}/products/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    const p = await response.json();
    return transformProduct(p);
  } catch (error) {
    console.error('Error fetching product from API:', error);
    return undefined;
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const products = await fetchProducts();
  return products.filter((p) => p.category === category);
}

export async function fetchTrendingProducts(): Promise<Product[]> {
  // Backend doesn't have trending field, return empty or first few products
  const products = await fetchProducts();
  return products.slice(0, 4);
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const API_URL = getApiUrl();
    const response = await fetch(
      `${API_URL}/products/search?q=${encodeURIComponent(query)}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error('Search failed');
    }

    const data = await response.json();
    return (data.results || []).map(transformProduct);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

export async function fetchSettings(): Promise<{ whatsappNumber: string }> {
  try {
    const API_URL = getApiUrl();
    const response = await fetch(`${API_URL}/settings`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching settings:', error);
    return { whatsappNumber: '' };
  }
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const API_URL = getApiUrl();
    const response = await fetch(`${API_URL}/categories`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
