import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <Navbar bg='light' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            M.IRWIN
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
              <Nav.Link as={Link} to='/login'>
                <i className='fas fa-user'></i> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
