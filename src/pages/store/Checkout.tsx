import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageTransition from '../../components/PageTransition';
import { useCart } from '../../context/CartContext';
import { ordersApi } from '../../api/orders.api';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      await ordersApi.create({
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        shippingAddress: address,
      });
      toast.success('Order placed!');
      clearCart();
      navigate('/my-orders');
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Checkout failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <Container className="py-5">
        <h1 className="fw-bold mb-4">Checkout</h1>
        <Row className="g-4">
          <Col md={7}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Shipping details</h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full shipping address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, city, state, PIN"
                    />
                  </Form.Group>
                  <p className="text-muted small">
                    Payment is skipped in this prototype — the order goes straight to "pending".
                  </p>
                  <Button variant="dark" size="lg" type="submit" disabled={submitting}>
                    {submitting ? <Spinner size="sm" /> : 'Place order'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Your order</h5>
                {items.map((i) => (
                  <div key={i.product.id} className="d-flex justify-content-between small mb-2">
                    <span>{i.product.name} × {i.quantity}</span>
                    <span>₹{(i.product.price * i.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageTransition>
  );
}