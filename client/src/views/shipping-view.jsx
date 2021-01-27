import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../redux/actions/cart-actions'

// Components
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const Shipping = ({ history }) => {
  // Shipping Address
  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  // Redux
  const { shippingAddress } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    if (shippingAddress) setShipping(shippingAddress)
  }, [shippingAddress])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddress(shipping))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Ex. 159 Dundas St. East'
            value={shipping.address}
            onChange={e =>
              setShipping({ ...shipping, address: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Ex. Toronto, ON'
            value={shipping.city}
            onChange={e => setShipping({ ...shipping, city: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Ex. M5B 0A9'
            value={shipping.postalCode}
            onChange={e =>
              setShipping({ ...shipping, postalCode: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Ex. Canada'
            value={shipping.country}
            onChange={e =>
              setShipping({ ...shipping, country: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Shipping
