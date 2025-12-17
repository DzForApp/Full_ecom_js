import { api } from './axios';

// Types
export interface User {
  id: string;
  email: string;
  nameEn: string;
  nameAr: string;
  role: 'admin' | 'customer';
}

export // Définissez le type localement si nécessaire
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
  totalItems: number;
}

// Auth Services
export const authService = {
  register: async (data: {
    email: string;
    password: string;
    nameEn: string;
    nameAr: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', data);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data.user;
  },
};

// Product Services
export const productService = {
  getAll: async (params?: any) => {
    const response = await api.get('/products', { params });
    console.log('la fonction api axios getAll of product run correctly')
    return response.data;
  },

  getFeatured: async (limit = 8) => {
    const response = await api.get(`/products/featured?limit=${limit}`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  search: async (query: string) => {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  },
};

// Category Services
export const categoryService = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};

// Cart Services
export const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (productId: string, quantity: number = 1) => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  },

  updateCartItem: async (itemId: string, quantity: number) => {
    const response = await api.patch(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (itemId: string) => {
    await api.delete(`/cart/${itemId}`);
  },

  clearCart: async () => {
    await api.delete('/cart');
  },

  getCartCount: async () => {
    const response = await api.get('/cart/count');
    return response.data;
  },
};