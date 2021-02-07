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

const UserEdit = ({ match }) => {
  // Form Fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState('')

  // Update State
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  // Logged In User Details
  const { userDetails } = useSelector(state => state.user)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/api/users/${match.params.id}`, {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then(user => {
        setName(user.data.name)
        setEmail(user.data.email)
        setIsAdmin(user.data.isAdmin)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [match.params.id, userDetails.token])

  const updateHandler = e => {
    e.preventDefault()
    setLoading(true)
    const payload = { name, email, isAdmin }
    axios
      .put(`/api/users/${match.params.id}`, payload, {
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

  const renderContent = () => {
    if (loading) return <Loader />

    return (
      <>
        <Form onSubmit={updateHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Username'
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

          <Form.Group controlId='isAdmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button as={Link} to='/admin/users' className='mr-3 btn-light'>
            Back
          </Button>
          <Button type='submit' variant='primary'>
            Update User
          </Button>
        </Form>
      </>
    )
  }

  return (
    <FormContainer>
      <h1>Update User</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message>User {name} updated successfully!</Message>}
      {renderContent()}
    </FormContainer>
  )
}

export default UserEdit
