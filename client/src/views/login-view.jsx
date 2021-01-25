import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/user-actions'

// Components
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'

  // Redux
  const dispatch = useDispatch()
  const { loading, userDetails, error } = useSelector(state => state.user)

  useEffect(() => {
    if (userDetails) history.push(redirect)
    // cleanup state errors when leaving page
  }, [history, userDetails, redirect])

  const signIn = e => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const renderContent = () => {
    if (loading) return <Loader />

    return (
      <>
        <Form onSubmit={signIn}>
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

          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Don't have an account?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register here!
            </Link>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {renderContent()}
    </FormContainer>
  )
}

export default Login
