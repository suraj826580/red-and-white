import axios from "axios";
import {
  GET_DASHBOARD_BLOGS_FAILURE,
  GET_DASHBOARD_BLOGS_REQ,
  GET_DASHBOARD_BLOGS_SUCCESS,
} from "./action-types";

export const getDashboardBlogs = (dispatch) => {
  dispatch({ type: GET_DASHBOARD_BLOGS_REQ });
  return axios
    .get(`${process.env.REACT_APP_URL}/blogs/get-blogs`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((res) =>
      dispatch({
        type: GET_DASHBOARD_BLOGS_SUCCESS,
        payload: res.data.blogList,
      })
    )
    .catch((err) => dispatch({ type: GET_DASHBOARD_BLOGS_FAILURE }));
};
