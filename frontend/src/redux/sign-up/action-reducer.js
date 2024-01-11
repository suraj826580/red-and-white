import {
  GET_SIGN_IN_FAILURE,
  GET_SIGN_IN_REQ,
  GET_SIGN_IN_SUCCESS,
} from "./actions-types";

const intialState = {
  isLoading: false,
  isError: false,
  signUpMsg: "",
};

export const signUpReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case GET_SIGN_IN_REQ:
      return { ...state, isLoading: true, isError: false };
    case GET_SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        signUpMsg: payload,
      };
    case GET_SIGN_IN_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
