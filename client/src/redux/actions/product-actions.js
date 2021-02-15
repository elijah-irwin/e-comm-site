import axios from 'axios'
import {
  PRODUCT_DELETE_ERROR,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS
} from '../constants'

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
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

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })
    const reqConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().user.userDetails.token}`
      }
    }
    await axios.delete(`/api/products/${id}`, reqConfig)
    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  }

  catch (err) {
    const message = err.response && err.response.data.message
      ? err.response.data.message
      : err.message
    dispatch({ type: PRODUCT_DELETE_ERROR, payload: message })
  }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCT_REVIEW_CREATE_REQUEST' })
    const reqConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().user.userDetails.token}`
      }
    }

    await axios.post(`/api/products/${productId}/reviews`, review, reqConfig)
    dispatch({ type: 'PRODUCT_REVIEW_CREATE_SUCCESS' })
  }

  catch (err) {
    const message = err.response && err.response.data.message
      ? err.response.data.message
      : err.message
    dispatch({ type: 'PRODUCT_REVIEW_CREATE_ERROR', payload: message })
  }
}