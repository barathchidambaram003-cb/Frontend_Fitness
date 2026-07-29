import { Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.25 }}
      className="h-100"
    >
      <Card className="h-100 border-0 shadow-sm overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <div style={{ overflow: 'hidden', height: 220 }}>
            <motion.img
              src={product.imageUrl}
              alt={product.name}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Link>
        <Card.Body className="d-flex flex-column">
          <Badge bg={product.category === 'equipment' ? 'primary' : 'success'} className="align-self-start mb-2">
            {product.category}
          </Badge>
          <Card.Title className="fs-6 fw-semibold">{product.name}</Card.Title>
          <Card.Text className="text-muted small flex-grow-1">
            {product.description.slice(0, 60)}...
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="fw-bold fs-5">₹{product.price.toLocaleString('en-IN')}</span>
            <Button size="sm" variant="dark" onClick={handleAdd} disabled={product.stock === 0}>
              <FaCartPlus className="me-1" /> Add
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}