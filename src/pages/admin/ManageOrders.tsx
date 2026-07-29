import { useEffect, useState } from 'react';
import { Container, Table, Form, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PageTransition from '../../components/PageTransition';
import { ordersApi } from '../../api/orders.api';
import type { Order, OrderStatus } from '../../types';

const statuses: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
const variant: Record<OrderStatus, string> = {
  pending: 'warning', paid: 'info', shipped: 'primary', delivered: 'success', cancelled: 'danger',
};

export default function ManageOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const load = () => ordersApi.findAll().then(setOrders);
  useEffect(() => { load(); }, []);

  const changeStatus = async (id: string, status: OrderStatus) => {
    await ordersApi.updateStatus(id, status);
    toast.success('Status updated');
    load();
  };

  return (
    <PageTransition>
      <Container className="py-5">
        <h1 className="fw-bold mb-4">Manage orders</h1>
        <Table responsive hover className="align-middle bg-white shadow-sm">
          <thead>
            <tr><th>Order</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td><code>{o.id.slice(0, 8)}</code></td>
                <td>{o.items.reduce((s, i) => s + i.quantity, 0)}</td>
                <td>₹{o.total.toLocaleString('en-IN')}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>
                  <Form.Select
                    size="sm"
                    value={o.status}
                    onChange={(e) => changeStatus(o.id, e.target.value as OrderStatus)}
                    style={{ width: 140 }}
                  >
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Form.Select>
                  <Badge bg={variant[o.status]} className="mt-1">{o.status}</Badge>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={5} className="text-center text-muted py-4">No orders yet</td></tr>
            )}
          </tbody>
        </Table>
      </Container>
    </PageTransition>
  );
}