import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  PRODUCT_DELETE_REQUEST,
} from '../constants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page
      }

    case PRODUCT_LIST_ERROR:
      return { loading: false, error: action.payload }

    case 'PRODUCT_LIST_RESET':
      return { products: [] }

    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }

    case PRODUCT_DETAILS_ERROR:
      return { loading: false, error: action.payload }

    case PRODUCT_DETAILS_RESET:
      return { product: { reviews: [] } }

    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }

    case PRODUCT_DELETE_ERROR:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCT_REVIEW_CREATE_REQUEST':
      return { loading: true }

    case 'PRODUCT_REVIEW_CREATE_SUCCESS':
      return { loading: false, success: true }

    case 'PRODUCT_REVIEW_CREATE_ERROR':
      return { loading: false, error: action.payload }

    case 'PRODUCT_REVIEW_CREATE_RESET':
      return {}

    default:
      return state
  }
}