import {
  GET_DASHBOARD_BLOGS_FAILURE,
  GET_DASHBOARD_BLOGS_REQ,
  GET_DASHBOARD_BLOGS_SUCCESS,
} from "./action-types";

const intialState = {
  isLoading: false,
  isError: false,
  dashboardBlogs: [],
};

export const dashboardBlogs = (state = intialState, { type, payload }) => {
  switch (type) {
    case GET_DASHBOARD_BLOGS_REQ:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_DASHBOARD_BLOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dashboardBlogs: payload,
      };
    case GET_DASHBOARD_BLOGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
