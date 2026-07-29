import { Container, Row, Col, Table, Button, Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <PageTransition>
        <Container className="py-5 text-center">
          <h2>Your cart is empty</h2>
          <p className="text-muted">Add some gym gear to get started.</p>
          <Button as={Link as any} to="/shop" variant="dark">Continue shopping</Button>
        </Container>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Container className="py-5">
        <h1 className="fw-bold mb-4">Your cart</h1>
        <Row className="g-4">
          <Col md={8}>
            <Table responsive borderless className="align-middle">
              <thead className="border-bottom">
                <tr><th>Product</th><th>Qty</th><th>Price</th><th></th></tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {items.map((i) => (
                    <motion.tr
                      key={i.product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -30 }}
                    >
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img src={i.product.imageUrl} alt="" width={60} height={60} style={{ objectFit: 'cover', borderRadius: 6 }} />
                          <div>
                            <div className="fw-semibold">{i.product.name}</div>
                            <small className="text-muted">{i.product.category}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min={1}
                          max={i.product.stock}
                          value={i.quantity}
                          onChange={(e) => updateQuantity(i.product.id, parseInt(e.target.value) || 1)}
                          style={{ width: 80 }}
                        />
                      </td>
                      <td className="fw-semibold">₹{(i.product.price * i.quantity).toLocaleString('en-IN')}</td>
                      <td>
                        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(i.product.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </Table>
            <Button variant="outline-secondary" size="sm" onClick={clearCart}>Clear cart</Button>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Order summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <Button variant="dark" size="lg" className="w-100 mt-3" onClick={() => navigate('/checkout')}>
                  Proceed to checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageTransition>
  );
}