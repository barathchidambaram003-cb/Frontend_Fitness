import { Container, Row, Col } from 'react-bootstrap';
import { FaDumbbell, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="d-flex align-items-center gap-2"><FaDumbbell /> FitShop</h5>
            <p className="text-secondary small">
              Premium gym equipment and supplements. Train hard, recover smart.
            </p>
          </Col>
          <Col md={4}>
            <h6>Shop</h6>
            <ul className="list-unstyled small">
              <li>Equipment</li>
              <li>Supplements</li>
              <li>New arrivals</li>
              <li>Best sellers</li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Follow us</h6>
            <div className="d-flex gap-3 fs-5">
              <FaInstagram /> <FaTwitter /> <FaFacebook />
            </div>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <p className="text-center small text-secondary mb-0">
          © {new Date().getFullYear()} FitShop. Prototype build.
        </p>
      </Container>
    </footer>
  );
}