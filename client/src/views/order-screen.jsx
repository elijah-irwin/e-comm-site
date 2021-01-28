import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../redux/actions/order-actions'

// Components
import Loader from '../components/Loader'
import Message from '../components/Message'

const Order = ({ match }) => {
  const orderId = match.params.id

  // Redux
  const dispatch = useDispatch()
  const { loading, order, error } = useSelector(state => state.orderDetails)

  if (order) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
  }

  useEffect(() => {
    if (!order || order._id !== orderId) dispatch(getOrderDetails(orderId))
  }, [orderId, dispatch, order])

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
