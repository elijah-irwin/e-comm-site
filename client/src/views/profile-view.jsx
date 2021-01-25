import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../redux/actions/user-actions'

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

  useEffect(() => {
    if (!userDetails) return history.push('/')

    setName(userDetails.name)
    setEmail(userDetails.email)

    return () => {
      // dispatch update cleanup
    }
  }, [userDetails, history])

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
      <Col md={3}>
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
      </Col>
    </Row>
  )
}

export default Profile
