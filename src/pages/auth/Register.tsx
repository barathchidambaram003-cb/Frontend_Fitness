import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/PageTransition';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Registration failed');
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
              <h2 className="fw-bold mb-4">Create account</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password (min 6)</Form.Label>
                  <Form.Control type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </Form.Group>
                <Button type="submit" variant="dark" className="w-100" disabled={loading}>
                  {loading ? 'Creating...' : 'Sign up'}
                </Button>
              </Form>
              <p className="text-center mt-3 mb-0 small">
                Have an account? <Link to="/login">Log in</Link>
              </p>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </PageTransition>
  );
}