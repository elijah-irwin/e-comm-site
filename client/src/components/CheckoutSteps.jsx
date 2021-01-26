import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Link as={Link} to='/shipping' disabled={!step1}>
        Sign In
      </Nav.Link>

      <Nav.Link as={Link} to='/shipping' disabled={!step2}>
        Shipping
      </Nav.Link>

      <Nav.Link as={Link} to='/payment' disabled={!step3}>
        Payment
      </Nav.Link>

      <Nav.Link as={Link} to='/place-order' disabled={!step4}>
        Place Order
      </Nav.Link>
    </Nav>
  )
}

export default CheckoutSteps
