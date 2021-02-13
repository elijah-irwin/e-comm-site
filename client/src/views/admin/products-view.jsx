import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
  listProducts,
  deleteProduct,
} from '../../redux/actions/product-actions'

// Components
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const Products = ({ history }) => {
  const dispatch = useDispatch()
  const { loading, products, error } = useSelector(state => state.productList)
  const { success, loading: deleteLoading, error: deleteError } = useSelector(
    state => state.productDelete
  )
  const { userDetails } = useSelector(state => state.user)
  const [createError, setCreateError] = useState()

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userDetails, success])

  const createProductHandler = () => {
    axios
      .post(
        '/api/products',
        {},
        {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      )
      .then(res => history.push(`/admin/products/${res.data._id}/edit`))
      .catch(err => setCreateError(err))
  }

  const deleteProductHandler = id => {
    if (window.confirm(`Are you sure you want to delete product ${id}?`)) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Product List</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Add Product
          </Button>
        </Col>
      </Row>
      {loading || deleteLoading ? (
        <Loader />
      ) : error || deleteError || createError ? (
        <Message variant='danger'>
          {error || deleteError || createError}
        </Message>
      ) : (
        <Table bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.countInStock}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/products/${product._id}/edit`}
                    variant='light'
                    className='btn-sm'
                  >
                    <i className='fas fa-edit'></i>
                  </Button>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default Products
