import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";

const OffcanvasExample = (props) => {


  const logOff3 = () => {
    props.setLogOut2(false)
    console.log("Navbar Component");
  }

  const expand = 'lg'
  return (
    <Navbar key={ expand } bg="dark" expand={ expand } className="navbar-dark">
      <Container fluid>
        <Navbar.Brand href="#">Plan&Go</Navbar.Brand>
        <Navbar.Toggle aria-controls={ `offcanvasNavbar-expand-${expand}` } />
        <Navbar.Offcanvas
          id={ `offcanvasNavbar-expand-${expand}` }
          aria-labelledby={ `offcanvasNavbarLabel-expand-${expand}` }
          placement="end"
        >
          <Offcanvas.Header className='bg-dark' closeButton>
            <Offcanvas.Title className='text-light' id={ `offcanvasNavbarLabel-expand-${expand}` }>
              Plan&Go
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='bg-dark navbar-dark'>
            <Nav className="justify-content-center">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link class="nav-item nav-link" to="/businessesMenu">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/Calendar">
                    Schedule
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/Welcome">
                    Favorites
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/">
                    Massages
                  </Link>
                </li>
              </ul>
              {/* <NavDropdown
                  title="Dropdown"
                  id={ `offcanvasNavbarDropdown-expand-${expand}` }
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
            </Nav>

            <Nav className="justify-content-end flex-grow-1 pe-3">

              <ul class="navbar-nav d-flex">
                <li class="nav-item me-1 my-1">
                  <button class="btn btn-outline-primary" to="/">
                    Profile
                  </button>
                </li>
                <li class="nav-item me-1 my-1">
                  <button onClick={ logOff3 } type="button" class="btn btn-outline-danger">
                    Logout
                  </button>
                </li>
              </ul>

            </Nav>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar >
  );
}

export default OffcanvasExample;