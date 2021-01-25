import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_ERROR, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants"

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

    // LOGOUT
    case USER_LOGOUT:
      return {}

    default:
      return state
  }
}