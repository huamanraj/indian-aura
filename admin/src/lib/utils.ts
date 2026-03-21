import { Product, AdminSettings } from './types';

const PRODUCTS_KEY = 'indian_aura_products';
const SETTINGS_KEY = 'indian_aura_settings';
const AUTH_KEY = 'indian_aura_admin_auth';

export function generateUUID(): string {
  return crypto.randomUUID();
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function getProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function setProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getProductById(uuid: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.uuid === uuid);
}

export function addProduct(product: Omit<Product, 'uuid' | 'slug' | 'createdAt' | 'updatedAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    uuid: generateUUID(),
    slug: generateSlug(product.name),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  setProducts(products);
  return newProduct;
}

export function updateProduct(uuid: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.uuid === uuid);
  if (index === -1) return null;

  const updatedProduct = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  if (updates.name) {
    updatedProduct.slug = generateSlug(updates.name);
  }

  products[index] = updatedProduct;
  setProducts(products);
  return updatedProduct;
}

export function deleteProduct(uuid: string): boolean {
  const products = getProducts();
  const filtered = products.filter(p => p.uuid !== uuid);
  if (filtered.length === products.length) return false;
  setProducts(filtered);
  return true;
}

export function getSettings(): AdminSettings {
  if (typeof window === 'undefined') return { whatsappNumber: '' };
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : { whatsappNumber: '' };
}

export function updateSettings(settings: Partial<AdminSettings>): AdminSettings {
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}

export function setAuth(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, token);
}

export function getAuth(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_KEY);
}

export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAuth();
}

export const CATEGORIES = [
  'Diyas',
  'Puja Thalis',
  'Toran',
  'Incense Holders',
  'Decorative Items',
  'Gift Sets',
  'Other'
];
