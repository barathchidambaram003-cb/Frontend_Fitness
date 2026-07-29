import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Spinner, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaCartPlus, FaStar } from 'react-icons/fa';
import PageTransition from '../../components/PageTransition';
import { productsApi } from '../../api/products.api';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!id) return;
    productsApi.findOne(id).then(setProduct).catch(() => navigate('/shop'));
  }, [id, navigate]);

  if (!product) {
    return <Container className="py-5 text-center"><Spinner /></Container>;
  }

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${qty} × ${product.name} added to cart`);
  };

  return (
    <PageTransition>
      <Container className="py-5">
        <Row className="g-5">
          <Col md={6}>
            <motion.img
              src={product.imageUrl}
              alt={product.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-100 rounded shadow-sm"
              style={{ objectFit: 'cover', maxHeight: 500 }}
            />
          </Col>
          <Col md={6}>
            <Badge bg={product.category === 'equipment' ? 'primary' : 'success'} className="mb-2">
              {product.category}
            </Badge>
            <h1 className="fw-bold">{product.name}</h1>
            {product.brand && <p className="text-muted mb-2">by {product.brand}</p>}
            {product.rating != null && product.rating > 0 && (
              <p className="mb-2"><FaStar className="text-warning" /> {product.rating} / 5</p>
            )}
            <h2 className="my-3">₹{product.price.toLocaleString('en-IN')}</h2>
            <p>{product.description}</p>
            <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>

            <div className="d-flex align-items-center gap-3 mt-4">
              <Form.Control
                type="number"
                min={1}
                max={product.stock}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: 100 }}
              />
              <Button variant="dark" size="lg" onClick={handleAdd} disabled={product.stock === 0}>
                <FaCartPlus className="me-2" /> Add to cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </PageTransition>
  );
}