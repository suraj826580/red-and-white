import {
  GET_LOGIN_FAILURE,
  GET_LOGIN_REQ,
  GET_LOGIN_SUCCESS,
} from "./action-types";

const intialState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  token: false,
  signInMsg: "",
};

export const AuthReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case GET_LOGIN_REQ:
      return { ...state, isLoading: true, isError: false };
    case GET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
        signInMsg: payload.msg,
      };
    case GET_LOGIN_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
