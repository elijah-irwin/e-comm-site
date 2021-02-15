import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/product-actions'

// Components
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const Home = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  // Redux
  const dispatch = useDispatch()
  const { loading, products, pages, page, error } = useSelector(
    state => state.productList
  )

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    return () => {
      dispatch({ type: 'PRODUCT_LIST_RESET' })
    }
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col sm={12} md={6} lg={4} xl={3} key={product.name}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  )
}

export default Home
