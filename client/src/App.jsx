import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './views/home-view'
import Product from './views/product-view'
import Cart from './views/cart-view'

const App = () => {
  return (
    <Router>
      <Header />
      <Container className='py-3 main-content'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
