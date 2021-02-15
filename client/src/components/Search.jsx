import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const Search = () => {
  const [keyword, setKeyword] = useState('')
  let history = useHistory()

  const submitHandler = e => {
    e.preventDefault()
    if (keyword.trim()) history.push(`/search/${keyword}`)
    else history.push('/')
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder='Search...'
        className='mr-sm-2'
      ></Form.Control>
      <Button type='submit' variant='light' className='p-2'>
        <i className='fas fa-search'></i>
      </Button>
    </Form>
  )
}

export default Search
