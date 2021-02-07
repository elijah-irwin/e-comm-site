import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/user-actions'

const Header = () => {
  const dispatch = useDispatch()
  const { userDetails } = useSelector(state => state.user)

  const userLogout = () => {
    dispatch(logout())
    window.location.pathname = '/'
  }

  const renderSignIn = () => {
    if (userDetails) {
      return (
        <NavDropdown
          title={
            <span>
              <i className='fas fa-user'></i> {userDetails.name}
            </span>
          }
          id='username'
        >
          <NavDropdown.Item as={Link} to='/profile'>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      )
    }

    return (
      <Nav.Link as={Link} to='/login'>
        <i className='fas fa-user'></i> Sign In
      </Nav.Link>
    )
  }

  const renderAdmin = () => {
    if (userDetails && userDetails.isAdmin) {
      return (
        <NavDropdown title='Admin' id='admin'>
          <NavDropdown.Item as={Link} to='/admin/users'>
            User List
          </NavDropdown.Item>
        </NavDropdown>
      )
    }

    return null
  }

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
              {renderSignIn()}
              {renderAdmin()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
