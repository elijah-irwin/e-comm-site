import axios from 'axios'
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_ERROR,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR
} from '../constants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const reqConfig = { headers: { 'Content-Type': 'application/json' } }
    const { data } = await axios.post('/api/users/login', { email, password }, reqConfig)
    localStorage.setItem('userDetails', JSON.stringify(data))
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
  }

  catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message
    dispatch({ type: USER_LOGIN_ERROR, payload: message })
  }
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })
    const reqConfig = { headers: { 'Content-Type': 'application/json' } }
    const { data } = await axios.post('/api/users', { name, email, password }, reqConfig)
    localStorage.setItem('userDetails', JSON.stringify(data))
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
  }

  catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message
    dispatch({ type: USER_REGISTER_ERROR, payload: message })
  }
}

export const update = (name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST })
    const reqConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().user.userDetails.token}`
      }
    }
    const { data } = await axios.put(`/api/users/profile`, { name, email, password }, reqConfig)
    localStorage.setItem('userDetails', JSON.stringify(data))
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
  }

  catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message
    dispatch({ type: USER_UPDATE_ERROR, payload: message })
  }
}

export const logout = () => (dispatch) => {
  localStorage.setItem('userDetails', null)
  localStorage.setItem('shippingAddress', null)
  localStorage.setItem('paymentMethod', null)
  dispatch({ type: USER_LOGOUT })
}

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })
    const reqConfig = {
      headers: {
        'Authorization': `Bearer ${getState().user.userDetails.token}`
      }
    }
    const { data } = await axios.get('/api/users', reqConfig)
    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  }

  catch (err) {
    const message = err.response && err.response.data.message
      ? err.response.data.message
      : err.message
    dispatch({ type: USER_LIST_ERROR, payload: message })
  }
}

export const deleteUser = userId => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })
    const reqConfig = {
      headers: {
        'Authorization': `Bearer ${getState().user.userDetails.token}`
      }
    }
    await axios.delete(`/api/users/${userId}`, reqConfig)
    dispatch({ type: USER_DELETE_SUCCESS })
  }

  catch (err) {
    const message = err.response && err.response.data.message
      ? err.response.data.message
      : err.message
    dispatch({ type: USER_DELETE_ERROR, payload: message })
  }
}

