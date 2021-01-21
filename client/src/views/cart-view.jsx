import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/actions/cart-actions'

// Components
import Message from '../components/Message'

const Cart = ({ location, history }) => {
  const { id } = useParams()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  // Redux
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)

  useEffect(() => {
    if (id) dispatch(addToCart(id, qty))
  }, [dispatch, id, qty])

  // Handlers
  const removeFromCartHandler = productId => {
    dispatch(removeFromCart(productId))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  // Render Functions
  const renderCart = () => {
    if (cartItems.length === 0)
      return <Message>There's nothing here...</Message>

    return (
      <ListGroup variant='flush'>
        {cartItems.map(item => (
          <ListGroup.Item key={item.product}>
            <Row>
              <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded />
              </Col>
              <Col md={3}>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              </Col>
              <Col md={2}>${item.price}</Col>
              <Col md={2}>
                <Form.Control
                  as='select'
                  value={item.qty}
                  onChange={e =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map(x => (
                    <option value={x + 1} key={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col md={2}>
                <Button
                  type='button'
                  variant='light'
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }

  // Render
  return (
    <Row>
      <Col md={8}>
        <h1>Cart</h1>
        {renderCart()}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart
