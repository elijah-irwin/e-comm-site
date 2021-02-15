import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'

// Redux
import { useSelector } from 'react-redux'

// Components
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const Orders = ({ history }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { userDetails } = useSelector(state => state.user)

  useEffect(() => {
    if (!userDetails || !userDetails.isAdmin) history.push('/login')

    setLoading(true)
    const config = {
      headers: { Authorization: `Bearer: ${userDetails.token}` },
    }
    axios
      .get('/api/orders/all', config)
      .then(res => {
        setOrders(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [history, userDetails])

  return (
    <>
      <h1>Order List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.message}</Message>
      ) : (
        <Table bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Shipping Address</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.email}</td>
                <td>{order.shippingAddress.address}</td>
                <td>${order.totalPrice}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.paidAt ? order.paidAt : 'Not Paid'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default Orders
