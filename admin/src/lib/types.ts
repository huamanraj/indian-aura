export type ProductImage = {
  url: string;
  public_id: string;
};

export type Product = {
  _id: string;
  uuid: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  category: string;
  relatedProducts: string[];
  images: ProductImage[];
  inStock: boolean;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type AdminSettings = {
  whatsappNumber: string;
};

export type DashboardStats = {
  totalProducts: number;
  totalContacts: number;
  categories: number;
  totalImages: number;
  hasWhatsApp: boolean;
};

export type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};
