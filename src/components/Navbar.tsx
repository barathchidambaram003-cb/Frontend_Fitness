import { Navbar as BsNavbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaDumbbell, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <BsNavbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <BsNavbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
            <FaDumbbell /> FitShop
          </BsNavbar.Brand>
          <BsNavbar.Toggle />
          <BsNavbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
              <Nav.Link as={Link} to="/shop?category=equipment">Equipment</Nav.Link>
              <Nav.Link as={Link} to="/shop?category=supplements">Supplements</Nav.Link>
            </Nav>
            <Nav className="align-items-center">
              <Nav.Link as={Link} to="/cart" className="position-relative me-3">
                <FaShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {totalItems}
                  </Badge>
                )}
              </Nav.Link>
              {user ? (
                <NavDropdown
                  title={<span><FaUserCircle className="me-1" />{user.name}</span>}
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/my-orders">My Orders</NavDropdown.Item>
                  {isAdmin && (
                    <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/admin">Admin Dashboard</NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Sign up</Nav.Link>
                </>
              )}
            </Nav>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>
    </motion.div>
  );
}