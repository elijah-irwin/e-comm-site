import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/user-actions'

// Components
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const Register = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [clientErr, setClientErr] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'

  // Redux
  const dispatch = useDispatch()
  const { loading, userDetails, error } = useSelector(state => state.user)

  useEffect(() => {
    if (userDetails) history.push(redirect)
    // cleanup state errors when leaving page
  }, [history, userDetails, redirect])

  const signUp = e => {
    e.preventDefault()
    setClientErr(null)
    if (password !== confirmPass) return setClientErr('Passwords do not match.')
    dispatch(register(name, email, password))
  }

  const renderContent = () => {
    if (loading) return <Loader />

    return (
      <>
        <Form onSubmit={signUp}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your Name'
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
            Sign Up
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login here!
            </Link>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {clientErr && <Message variant='danger'>{clientErr}</Message>}
      {renderContent()}
    </FormContainer>
  )
}

export default Register
