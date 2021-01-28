import React from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../redux/actions/cart-actions'

// Components
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { Collection } from 'mongoose'
import { Link } from 'react-router-dom'

const PlaceOrder = () => {
  // Redux
  const cart = useSelector(state => state.cart)
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 20
  cart.taxPrice = Number((cart.itemsPrice + cart.shippingPrice) * 0.13).toFixed(
    2
  )
  cart.totalPrice = (
    cart.itemsPrice +
    cart.shippingPrice +
    Number(cart.taxPrice)
  ).toFixed(2)

  const placeOrderHandler = () => {
    console.log('yo')
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <div>
                <span style={{ fontWeight: 'bold' }}>Address: </span>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <div>
                <span style={{ fontWeight: 'bold' }}>Method: </span>
                {cart.paymentMethod}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item(s)</h2>
              <ListGroup variant='flush'>
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrder
