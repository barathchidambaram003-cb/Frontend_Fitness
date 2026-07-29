import { useEffect, useState } from 'react';
import { Container, Card, Badge, Spinner } from 'react-bootstrap';
import PageTransition from '../../components/PageTransition';
import { ordersApi } from '../../api/orders.api';
import type { Order, OrderStatus } from '../../types';

const statusVariant: Record<OrderStatus, string> = {
  pending: 'warning',
  paid: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'danger',
};

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi.findMine().then(setOrders).finally(() => setLoading(false));
  }, []);

  if (loading) return <Container className="py-5 text-center"><Spinner /></Container>;

  return (
    <PageTransition>
      <Container className="py-5">
        <h1 className="fw-bold mb-4">My orders</h1>
        {orders.length === 0 ? (
          <p className="text-muted">You haven't placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <Card key={order.id} className="mb-3 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <div className="text-muted small">Order #{order.id.slice(0, 8)}</div>
                    <div className="text-muted small">
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <Badge bg={statusVariant[order.status]}>{order.status}</Badge>
                </div>
                {order.items.map((i, idx) => (
                  <div key={idx} className="d-flex justify-content-between small">
                    <span>{i.name} × {i.quantity}</span>
                    <span>₹{(i.price * i.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString('en-IN')}</span>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </PageTransition>
  );
}