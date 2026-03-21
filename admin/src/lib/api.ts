import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const products = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  create: async (formData: FormData) => {
    const response = await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  update: async (id: string, formData: FormData) => {
    const response = await api.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export const settings = {
  get: async () => {
    const response = await api.get('/settings');
    return response.data;
  },
  update: async (data: { whatsappNumber: string }) => {
    const response = await api.put('/settings', data);
    return response.data;
  },
};

export const contacts = {
  getAll: async () => {
    const response = await api.get('/contacts');
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },
};

export const stats = {
  get: async () => {
    const response = await api.get('/stats');
    return response.data;
  },
};

export const categories = {
  getAll: async () => {
    const response = await api.get('/categories/all');
    return response.data;
  },
  getPublic: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
  create: async (data: { name: string; description?: string; order?: number }) => {
    const response = await api.post('/categories', data);
    return response.data;
  },
  update: async (id: string, data: { name?: string; description?: string; order?: number; isActive?: boolean }) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
  reorder: async (categories: { id: string; order: number }[]) => {
    const response = await api.put('/categories/reorder', { categories });
    return response.data;
  },
};

export default api;
