import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './views/home-view'
import Product from './views/product-view'

const App = () => {
  return (
    <Router>
      <Header />
      <Container className='py-3 main-content'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/product/:id'>
            <Product />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
