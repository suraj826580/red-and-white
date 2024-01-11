import {
  UPDATE_BLOG_FAILURE,
  UPDATE_BLOG_REQ,
  UPDATE_BLOG_SUCCESS,
} from "./action-types";

const intialState = {
  isLoading: false,
  isError: false,
  msg: "",
};
export const UpdateBlogReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case UPDATE_BLOG_REQ:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: payload,
      };
    case UPDATE_BLOG_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
