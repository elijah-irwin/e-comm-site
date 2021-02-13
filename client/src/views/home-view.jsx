import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/product-actions'

// Components
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Home = () => {
  const dispatch = useDispatch()
  const { loading, products, error } = useSelector(state => state.productList)

  useEffect(() => {
    dispatch(listProducts())
    return () => {
      dispatch({ type: 'PRODUCT_LIST_RESET' })
    }
    // cleannup product list data here so it does dbl flash on reload
  }, [dispatch])

  const renderContent = () => {
    if (loading) return <Loader />
    if (error) return <Message variant='danger'>{error}</Message>

    return (
      <Row>
        {products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={product.name}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <>
      <h1>Latest Products</h1>
      {renderContent()}
    </>
  )
}

export default Home
