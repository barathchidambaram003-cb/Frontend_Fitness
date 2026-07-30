import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaDumbbell, FaFlask, FaShippingFast } from 'react-icons/fa';
import ProductCard from '../../components/ProductCard';
import PageTransition from '../../components/PageTransition';
import { productsApi } from '../../api/products.api';
import type { Product } from '../../types';

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    productsApi.findAll({ sort: 'price_desc' }).then((list) => setFeatured(list.slice(0, 4)));
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          minHeight: '85vh',
          background:
            'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600) center/cover',
        }}
      >
        <Container>
          <Row>
            <Col md={7}>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
                className="display-3 fw-bold"
              >
                Train hard. Recover smart.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8, ease: easeOutExpo }}
                className="lead mb-4"
              >
                Premium equipment and clean supplements — everything you need to hit your goals.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: easeOutExpo }}
              >
                <Button as={Link as any} to="/shop" variant="light" size="lg" className="me-3">
                  Shop now
                </Button>
                <Button as={Link as any} to="/shop?category=supplements" variant="outline-light" size="lg">
                  Supplements
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Category strip */}
      <Container className="py-5 my-4">
        <Row className="g-4">
          {[
            { icon: <FaDumbbell size={36} />, title: 'Gym equipment', text: 'Dumbbells, barbells, benches' },
            { icon: <FaFlask size={36} />, title: 'Supplements', text: 'Whey, creatine, pre-workout' },
            { icon: <FaShippingFast size={36} />, title: 'Fast shipping', text: 'Delivered in 2–4 days' },
          ].map((f, i) => (
            <Col md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: easeOutExpo }}
                className="text-center p-4 border rounded shadow-sm h-100"
              >
                <div className="text-primary mb-3">{f.icon}</div>
                <h5>{f.title}</h5>
                <p className="text-muted mb-0">{f.text}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured products */}
      <Container className="py-5 my-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <h2 className="fw-bold mb-0">Featured products</h2>
          <Link to="/shop" className="text-decoration-none">View all →</Link>
        </motion.div>
        <Row className="g-4">
          {featured.map((p, i) => (
            <Col key={p.id} md={6} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: easeOutExpo }}
              >
                <ProductCard product={p} />
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </PageTransition>
  );
}