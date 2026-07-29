import api from './axios';
import type { Order, OrderStatus } from '../types';

interface CreateOrderPayload {
  items: { productId: string; quantity: number }[];
  shippingAddress: string;
}

export const ordersApi = {
  create: (data: CreateOrderPayload) =>
    api.post<Order>('/orders', data).then((r) => r.data),

  findMine: () => api.get<Order[]>('/orders/mine').then((r) => r.data),

  findAll: () => api.get<Order[]>('/orders').then((r) => r.data),

  updateStatus: (id: string, status: OrderStatus) =>
    api.patch<Order>(`/orders/${id}/status`, { status }).then((r) => r.data),
};