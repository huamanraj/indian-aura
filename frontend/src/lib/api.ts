import { products, type Product } from "./products";

// Use different URL for server-side vs client-side
const getApiUrl = () => {
  // Server-side: use localhost or environment variable
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  }
  // Client-side: use environment variable or relative path
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

export async function fetchProducts(): Promise<Product[]> {
  try {
    const API_URL = getApiUrl();
    console.log('Fetching products from:', `${API_URL}/products`);
    
    const response = await fetch(`${API_URL}/products`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.error('API response not OK:', response.status, response.statusText);
      throw new Error('Failed to fetch products');
    }
    
    const backendProducts = await response.json();
    console.log('Fetched products count:', backendProducts.length);
    
    // Transform backend products to frontend format
    const transformed = backendProducts.map((p: any) => ({
      id: p._id,
      name: p.name,
      image: p.images?.[0]?.url || '/image1.jpeg',
      price: `₹${p.price.toLocaleString()}`,
      priceValue: p.price,
      category: p.category,
      description: p.description,
      trending: false, // Backend doesn't have trending field
    }));
    
    console.log('Successfully transformed products');
    return transformed;
  } catch (error) {
    console.error('Error fetching products from API, using static data:', error);
    // Fallback to static data if API fails
    return products;
  }
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  try {
    const API_URL = getApiUrl();
    const response = await fetch(`${API_URL}/products/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    const p = await response.json();
    
    return {
      id: p._id,
      name: p.name,
      image: p.images?.[0]?.url || '/image1.jpeg',
      price: `₹${p.price.toLocaleString()}`,
      priceValue: p.price,
      category: p.category,
      description: p.description,
      trending: false,
    };
  } catch (error) {
    console.error('Error fetching product from API, using static data:', error);
    return products.find((p) => p.id === id);
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products.filter((p) => p.category === category);
}

export async function fetchTrendingProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products.filter((p) => p.trending);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}
