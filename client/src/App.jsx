import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'

// Screens
import Home from './views/home-view'
import Product from './views/product-view'
import Cart from './views/cart-view'
import Login from './views/login-view'
import Register from './views/register-view'

const App = () => {
  return (
    <Router>
      <Header />
      <Container className='py-3 main-content'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
