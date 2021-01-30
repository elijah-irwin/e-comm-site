import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, payOrder } from '../redux/actions/order-actions'
import { ORDER_PAY_RESET } from '../redux/constants'

// Components
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'

const Order = ({ match }) => {
  const orderId = match.params.id
  const [sdkReady, setSdkReady] = useState(false)

  // Redux
  const dispatch = useDispatch()
  const { loading, order, error } = useSelector(state => state.orderDetails)
  const { loading: loadingPay, success: successPay } = useSelector(
    state => state.orderPay
  )

  if (order) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
  }

  useEffect(() => {
    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) addPayPalScript()
      else setSdkReady(true)
    }
  }, [orderId, dispatch, order, successPay])

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get('/api/config/paypal')
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    script.async = true
    script.onload = () => setSdkReady(true)
    document.body.appendChild(script)
  }

  const successPaymentHandler = paymentResult => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const renderContent = () => {
    if (loading) return <Loader />
    if (error) return <Message variant='danger'>{error}</Message>

    return (
      <>
        <h1 className='py-3'>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <div>
                  <span style={{ fontWeight: 'bold' }}>Name: </span>
                  {order.user.name}
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>Email: </span>
                  {order.user.email}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>Address: </span>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </div>
                {order.isDelivered ? (
                  <Message variant='success' noMargin>
                    Order successfully delivered on: {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='warning' noMargin>
                    Order not yet delivered.
                  </Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>Method: </span>
                  {order.paymentMethod}
                </div>
                {order.isPaid ? (
                  <Message variant='success' noMargin>
                    Order successfully paid at: {order.paidAt}
                  </Message>
                ) : (
                  <Message variant='warning' noMargin>
                    Order not yet paid.
                  </Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Item(s)</h2>
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row style={{ alignItems: 'center' }}>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
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
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  }

  return renderContent()
}

export default Order
