import api from './axios';
import type { Product, ProductCategory } from '../types';

interface FindOpts {
  category?: ProductCategory;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'name';
}

export const productsApi = {
  findAll: (opts: FindOpts = {}) =>
    api.get<Product[]>('/products', { params: opts }).then((r) => r.data),

  findOne: (id: string) => api.get<Product>(`/products/${id}`).then((r) => r.data),

  create: (data: Omit<Product, 'id' | 'rating'>) =>
    api.post<Product>('/products', data).then((r) => r.data),

  update: (id: string, data: Partial<Product>) =>
    api.patch<Product>(`/products/${id}`, data).then((r) => r.data),

  remove: (id: string) => api.delete(`/products/${id}`).then((r) => r.data),
};