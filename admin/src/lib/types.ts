export type Product = {
  uuid: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  category: string;
  relatedProducts: string[];
  images: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type AdminSettings = {
  whatsappNumber: string;
};

export type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};
