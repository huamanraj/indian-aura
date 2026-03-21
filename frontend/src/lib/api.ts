import { products, type Product } from "./products";

export async function fetchProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products;
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products.find((p) => p.id === id);
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
