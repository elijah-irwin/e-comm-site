import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../redux/actions/user-actions'

// Components
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const Users = () => {
  // Redux
  const dispatch = useDispatch()
  const { loading, users, error } = useSelector(state => state.usersList)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const deleteUser = id => {
    console.log(id)
  }

  return (
    <>
      <h1>User List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/user/${user._id}/edit`}
                    variant='light'
                    className='btn-sm'
                  >
                    <i className='fas fa-edit'></i>
                  </Button>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteUser(user._id)}
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

export default Users
