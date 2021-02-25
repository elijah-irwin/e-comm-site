import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import { productListReducer, productDetailsReducer, productDeleteReducer, productReviewCreateReducer } from './reducers/product-reducers'
import { cartReducer } from './reducers/cart-reducers'
import { userDeleteReducer, userListReducer, userReducer } from './reducers/user-reducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, ordersReducer } from './reducers/order-reducers'

const reducer = combineReducers({
  // key here is actual variable name of the state
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  user: userReducer,
  usersList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orders: ordersReducer
})

const cartItemsFromSessionStorage = sessionStorage.getItem('cartItems')
  ? JSON.parse(sessionStorage.getItem('cartItems'))
  : []

const userFromSessionStorage = sessionStorage.getItem('userDetails')
  ? JSON.parse(sessionStorage.getItem('userDetails'))
  : null

const shippingAddressFromSessionStorage = sessionStorage.getItem('shippingAddress')
  ? JSON.parse(sessionStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromSessionStorage = sessionStorage.getItem('paymentMethod')
  ? JSON.parse(sessionStorage.getItem('paymentMethod'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromSessionStorage,
    shippingAddress: shippingAddressFromSessionStorage,
    paymentMethod: paymentMethodFromSessionStorage
  },
  user: { userDetails: userFromSessionStorage },
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store