import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../redux/actions/product-actions'

// Components
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const Products = ({ history }) => {
  // Redux
  const dispatch = useDispatch()
  const { loading, products, error } = useSelector(state => state.productList)
  const { userDetails } = useSelector(state => state.user)

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userDetails])

  const createProductHandler = productId => {
    console.log(productId)
  }

  const deleteProductHandler = productId => {
    console.log(productId)
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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
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
