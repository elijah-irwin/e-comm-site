import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_ERROR,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_ERROR
} from '../constants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })
    const reqConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().user.userDetails.token}`
      }
    }
    const { data } = await axios.post('/api/orders', order, reqConfig)
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
  }

  catch (err) {
    const message = err.response && err.response.data.message
      ? err.response.data.message
      : err.message
    dispatch({ type: ORDER_CREATE_ERROR, payload: message })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })
    const reqConfig = {
      headers: {
        'Authorization': `Bearer ${getState().user.userDetails.token}`
      }
    }
    const { data } = await axios.get(`/api/orders/${id}`, reqConfig)
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  }

  catch (err) {
    const message = err.response && err.response.data.message
      ? err.response.data.message
      : err.message
    dispatch({ type: ORDER_DETAILS_ERROR, payload: message })
  }
}