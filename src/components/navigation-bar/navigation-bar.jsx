import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <>
      {[false].map((expand, i) => (
        <div key={i} className="navbar-holder">
          <Navbar key={expand} expand={expand} className="mb-4 navbar">
            <Container fluid>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}>
              </Navbar.Toggle>
              <Navbar.Brand as={Link} to="/" className="brand">
                My Library
              </Navbar.Brand>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="success">Search</Button>
              </Form>
              <Nav>
                {!user && (
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                )}
              </Nav>
              <Nav>
                {!user && (
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                )}
                {user && (
                  <>
                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                  </>
                )}
              </Nav>

              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-${expand}`}>
                    My Library
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link id="0" href="/">
                      Home
                    </Nav.Link>
                    <Nav.Link id="1" onClick={onLoggedOut} href="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link id="2" onClick={onLoggedOut} href="/signup">
                      Signup
                    </Nav.Link>
                    <Nav.Link id="3" onClick={onLoggedOut} href="/login">
                      Logout
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      ))}
    </>
  );
                }