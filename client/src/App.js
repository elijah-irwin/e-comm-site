import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView'

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <main className='py-3'>
          <HomeView />
        </main>
      </Container>
      <Footer />
    </>
  )
}

export default App
