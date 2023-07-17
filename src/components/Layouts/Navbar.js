import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';

import { useNavigate } from 'react-router-dom';

const MainNavbar = () => {
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useContext(AuthContext);

  let NavTabs = []

  if (isLoggedIn) {
    NavTabs = [
      {
        tabName: 'Home',
        pathName: '/businessesMenu'
      },
      {
        tabName: 'Favorites',
        pathName: '/FavoritesList'
      },
    ];
  } else {
    NavTabs = [
      {
        tabName: 'Login / Register',
        pathName: '/'
      }
    ];
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Welcome')
    }
  }, [ isLoggedIn ])

  const listOfNavTabs = (
    <ul className="navbar-nav">
      { NavTabs.map(({ tabName, pathName }, key) => (
        <li key={ key } className="nav-item">
          <Link className="nav-item nav-link" to={ pathName } key={ key }>
            { tabName }
          </Link>
        </li>
      )) }
    </ul>
  );

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
              { listOfNavTabs }
            </Nav>
            {
              isLoggedIn &&
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <ul className="navbar-nav d-flex">
                  <li className="nav-item me-1 my-1">
                    <Link className="btn btn-outline-primary" to="/Profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item me-1 my-1">
                    <button onClick={ logout }
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </Nav>
            }

          </Offcanvas.Body>

        </Navbar.Offcanvas>
      </Container>
    </Navbar >
  );
}

export default MainNavbar;