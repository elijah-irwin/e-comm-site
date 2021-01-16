import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import Product from '../components/Product'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products').then(res => {
      setProducts(res.data)
    })
  }, [])

  return (
    <>
      <h1 style={{ margin: '0px' }}>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={product.name}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home
