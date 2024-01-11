import {
  GET_BLOGS_LIST_FAILURE,
  GET_BLOGS_LIST_REQ,
  GET_BLOGS_LIST_SUCCESS,
} from "./actions-types";
const intialState = {
  isLoading: true,
  isError: false,
  blogList: [],
};
export const blogReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case GET_BLOGS_LIST_REQ:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_BLOGS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogList: payload,
      };
    case GET_BLOGS_LIST_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
