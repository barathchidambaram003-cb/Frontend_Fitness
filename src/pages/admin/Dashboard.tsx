import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaShoppingBag, FaUsers } from 'react-icons/fa';
import PageTransition from '../../components/PageTransition';
import { productsApi } from '../../api/products.api';
import { ordersApi } from '../../api/orders.api';
import { usersApi } from '../../api/users.api';

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });

  useEffect(() => {
    Promise.all([productsApi.findAll(), ordersApi.findAll(), usersApi.findAll()]).then(
      ([products, orders, users]) => {
        setStats({
          products: products.length,
          orders: orders.length,
          users: users.length,
          revenue: orders.reduce((sum, o) => sum + o.total, 0),
        });
      },
    );
  }, []);

  const cards = [
    { title: 'Products', value: stats.products, icon: <FaBoxOpen size={28} />, to: '/admin/products' },
    { title: 'Orders', value: stats.orders, icon: <FaShoppingBag size={28} />, to: '/admin/orders' },
    { title: 'Users', value: stats.users, icon: <FaUsers size={28} />, to: '/admin/users' },
    { title: 'Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: <span>₹</span>, to: '/admin/orders' },
  ];

  return (
    <PageTransition>
      <Container className="py-5">
        <h1 className="fw-bold mb-4">Admin dashboard</h1>
        <Row className="g-4">
          {cards.map((c, i) => (
            <Col md={6} lg={3} key={c.title}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card as={Link} to={c.to} className="shadow-sm text-decoration-none text-dark h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="text-muted small">{c.title}</div>
                        <div className="fs-3 fw-bold">{c.value}</div>
                      </div>
                      <div className="text-primary">{c.icon}</div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </PageTransition>
  );
}