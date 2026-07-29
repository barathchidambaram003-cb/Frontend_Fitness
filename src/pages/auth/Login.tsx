import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/PageTransition';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname ?? '/';

  const [email, setEmail] = useState('user@fitshop.com');
  const [password, setPassword] = useState('user123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const u = await login(email, password);
      navigate(u.role === 'admin' ? '/admin' : from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <Container className="py-5" style={{ maxWidth: 480 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="fw-bold mb-4">Log in</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button type="submit" variant="dark" className="w-100" disabled={loading}>
                  {loading ? 'Signing in...' : 'Log in'}
                </Button>
              </Form>
              <p className="text-center mt-3 mb-0 small">
                No account? <Link to="/register">Sign up</Link>
              </p>
              <hr />
              <p className="small text-muted mb-0">
                Try admin: <code>admin@fitshop.com</code> / <code>admin123</code>
              </p>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </PageTransition>
  );
}