import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

// Redux
import { useSelector } from 'react-redux'

// Components
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'

const ProductEdit = ({ match }) => {
  // Form Fields
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    countInStock: '',
  })

  // Update State
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  // Logged In User Details
  const { userDetails } = useSelector(state => state.user)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/api/products/${match.params.id}`, {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then(res => {
        setProduct({
          ...product,
          name: res.data.name,
          price: res.data.price,
          image: res.data.image,
          brand: res.data.brand,
          category: res.data.category,
          description: res.data.description,
          countInStock: res.data.countInStock,
        })
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
    // eslint-disable-next-line
  }, [match.params.id, userDetails.token])

  const updateHandler = e => {
    e.preventDefault()
    setLoading(true)
    axios
      .put(`/api/products/${match.params.id}`, product, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then(res => {
        setLoading(false)
        setSuccess(true)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    try {
      setUploading(true)
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }

      const { data } = await axios.post('/api/products/image', formData, config)
      setProduct({ ...product, image: data })
      setUploading(false)
    } catch (err) {
      console.error(err)
      setUploading(false)
    }
  }

  const renderContent = () => {
    if (loading) return <Loader />

    return (
      <>
        <Form onSubmit={updateHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={product.name}
              onChange={e => setProduct({ ...product, name: e.target.value })}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              value={product.price}
              onChange={e => setProduct({ ...product, price: e.target.value })}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              value={product.image}
              onChange={e => setProduct({ ...product, image: e.target.value })}
            ></Form.Control>
            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              value={product.brand}
              onChange={e => setProduct({ ...product, brand: e.target.value })}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              value={product.category}
              onChange={e =>
                setProduct({ ...product, category: e.target.value })
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='desc'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              value={product.description}
              onChange={e =>
                setProduct({ ...product, description: e.target.value })
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='stock'>
            <Form.Label>Stock Count</Form.Label>
            <Form.Control
              type='number'
              value={product.countInStock}
              onChange={e =>
                setProduct({ ...product, countInStock: e.target.value })
              }
            ></Form.Control>
          </Form.Group>

          <Button as={Link} to='/admin/products' className='mr-3 btn-light'>
            Back
          </Button>
          <Button type='submit' variant='primary'>
            Update Product
          </Button>
        </Form>
      </>
    )
  }

  return (
    <FormContainer>
      <h1>Update Product</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {success && (
        <Message>Product {product.name} updated successfully!</Message>
      )}
      {renderContent()}
    </FormContainer>
  )
}

export default ProductEdit
