import {
  GET_USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQ,
  USER_DETAILS_UPDATE_SUCCESS,
} from "./action-types";

const intialState = {
  isLoading: true,
  isError: false,
  msg: "",
  userData: {},
};

export const userReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case USER_DETAILS_REQ:
      return { ...state, isLoading: true, isError: false };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: payload,
      };
    case USER_DETAILS_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: payload,
      };
    case USER_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
