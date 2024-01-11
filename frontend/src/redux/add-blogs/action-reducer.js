import {
  ADD_BLOG_FAILURE,
  ADD_BLOG_REQ,
  ADD_BLOG_SUCCESS,
} from "./action-types";

const initialState = {
  isLoading: true,
  isError: false,
  msg: "",
};

export const addBlogReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_BLOG_REQ:
      return { ...state, isLoading: true, isError: false };
    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: payload,
      };
    case ADD_BLOG_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
