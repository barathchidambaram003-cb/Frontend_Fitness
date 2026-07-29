import { Container, Card, Row, Col } from 'react-bootstrap';
import PageTransition from '../../components/PageTransition';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <PageTransition>
      <Container className="py-5">
        <h1 className="fw-bold mb-4">My profile</h1>
        <Card className="shadow-sm">
          <Card.Body>
            <Row className="g-3">
              <Col md={6}><strong>Name:</strong> {user.name}</Col>
              <Col md={6}><strong>Email:</strong> {user.email}</Col>
              <Col md={6}><strong>Role:</strong> {user.role}</Col>
              <Col md={6}><strong>User ID:</strong> <code>{user.id}</code></Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </PageTransition>
  );
}