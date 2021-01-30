import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../redux/actions/user-actions'
import { getOrders } from '../redux/actions/order-actions'

// Components
import Message from '../components/Message'
import Loader from '../components/Loader'

const Profile = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [clientErr, setClientErr] = useState('')

  const dispatch = useDispatch()
  const { loading, success, userDetails, error } = useSelector(
    state => state.user
  )
  const { loading: ordersLoading, orders, error: ordersError } = useSelector(
    state => state.orders
  )

  useEffect(() => {
    if (!userDetails) return history.push('/')

    setName(userDetails.name)
    setEmail(userDetails.email)

    dispatch(getOrders())

    return () => {
      // dispatch update cleanup
    }
  }, [userDetails, history, dispatch])

  const updateProfile = e => {
    e.preventDefault()
    setClientErr(null)
    if (password !== confirmPass) return setClientErr('Passwords do not match.')
    dispatch(update(name, email, password))
  }

  const renderContent = () => {
    if (loading) return <Loader />

    return (
      <>
        <Form onSubmit={updateProfile}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your name...'
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='example@gmail.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='**********'
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='**********'
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update Profile
          </Button>
        </Form>
      </>
    )
  }

  return (
    <Row>
      <Col md={3} style={{ marginBottom: '40px' }}>
        <h2>My Profile</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='success'>Profile updated successfully!</Message>
        )}
        {clientErr && <Message variant='danger'>{clientErr}</Message>}
        {renderContent()}
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : ordersError ? (
          <Message variant='danger'>{ordersError}</Message>
        ) : (
          <Table bordered responsive className='table-sm'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/order/${order._id}`}
                      variant='light'
                      className='btn-sm'
                    >
                      View Order
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default Profile
