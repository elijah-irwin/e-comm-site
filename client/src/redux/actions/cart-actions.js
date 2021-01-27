import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from '../constants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  const cartItems = JSON.stringify(getState().cart.cartItems)
  localStorage.setItem('cartItems', cartItems)
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  const cartItems = JSON.stringify(getState().cart.cartItems)
  localStorage.setItem('cartItems', cartItems)
}

export const saveShippingAddress = (address) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: address
  })

  const shippingAddress = JSON.stringify(address)
  localStorage.setItem('shippingAddress', shippingAddress)
}

export const savePaymentMethod = (payment) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: payment
  })

  const paymentMethod = JSON.stringify(payment)
  localStorage.setItem('paymentMethod', paymentMethod)
}
