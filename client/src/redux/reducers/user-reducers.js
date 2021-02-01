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
  USER_LIST_ERROR
} from '../constants'

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    // LOGIN
    case USER_LOGIN_REQUEST:
      return { loading: true }

    case USER_LOGIN_SUCCESS:
      return { loading: false, userDetails: action.payload }

    case USER_LOGIN_ERROR:
      return { loading: false, error: action.payload }

    // REGISTER 
    case USER_REGISTER_REQUEST:
      return { loading: true }

    case USER_REGISTER_SUCCESS:
      return { loading: false, userDetails: action.payload }

    case USER_REGISTER_ERROR:
      return { loading: false, error: action.payload }

    // UPDATE 
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true }

    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userDetails: action.payload }

    case USER_UPDATE_ERROR:
      return { ...state, loading: false, error: action.payload }

    // LOGOUT
    case USER_LOGOUT:
      return {}

    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }

    case USER_LIST_ERROR:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}