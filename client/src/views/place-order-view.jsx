import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Spinner,
} from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../redux/actions/order-actions'

// Components
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const PlaceOrder = ({ history }) => {
  // Redux
  const dispatch = useDispatch()
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

  const { order, success, loading, error } = useSelector(
    state => state.orderCreate
  )

  useEffect(() => {
    if (success) history.push(`/order/${order._id}`)
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(createOrder(cart))
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
                    <Row style={{ alignItems: 'center' }}>
                      <Col md={2}>
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

              {error && (
                <ListGroup.Item>
                  <Message variant='danger' noMargin>
                    {error}
                  </Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                {!loading ? (
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                ) : (
                  <Spinner
                    animation='border'
                    style={{ display: 'block', margin: 'auto' }}
                  />
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrder
