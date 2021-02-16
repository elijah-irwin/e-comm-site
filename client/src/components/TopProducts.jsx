import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'

// Components
import Loader from './Loader'
import Message from './Message'

const TopProducts = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get('/api/products/top-rated')
      .then(res => {
        setLoading(false)
        setProducts(res.data)
      })
      .catch(err => {
        setLoading(false)
        setError(err.message)
      })
  }, [])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel interval={null}>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} className='d-block' />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} - {product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default TopProducts
