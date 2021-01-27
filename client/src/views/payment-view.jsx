import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../redux/actions/cart-actions'

// Components
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const Payment = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  // Redux
  const { shippingAddress } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  if (!shippingAddress) history.push('/shipping')

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/place-order')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type='radio'
              label='Stripe (Coming Soon)'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              disabled
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Payment
