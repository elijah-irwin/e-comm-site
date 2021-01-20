import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../redux/actions/product-actions'

// Components
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Product = ({ history }) => {
  const [qty, setQty] = useState(1)

  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, product, error } = useSelector(state => state.productDetails)

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id])

  const addToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`)
  }

  const renderContent = () => {
    if (loading) return <Loader />
    if (error) return <Message variant='danger'>{error}</Message>
    return (
      <Row>
        <Col md={12} lg={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={12} lg={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={12} lg={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col style={{ display: 'flex', alignItems: 'center' }}>
                      Quantity
                    </Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={e => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map(x => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                  onClick={addToCart}
                >
                  Add To Card
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Back
      </Link>
      {renderContent()}
    </>
  )
}

export default Product
