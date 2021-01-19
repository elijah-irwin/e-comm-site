import axios from 'axios'
import {
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS
} from '../constants'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('/api/products')
    setTimeout(() => {
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }, 1000)
  }

  catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message
    dispatch({ type: PRODUCT_LIST_ERROR, payload: message })
  }
}

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  }

  catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message
    dispatch({ type: PRODUCT_DETAILS_ERROR, payload: message })
  }
}