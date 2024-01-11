import {
  ADD_BLOG_FAILURE,
  ADD_BLOG_REQ,
  ADD_BLOG_SUCCESS,
} from "./action-types";
import axios from "axios";
export const addBlog = (data) => (dispatch) => {
  dispatch({ type: ADD_BLOG_REQ });
  return axios
    .post(`${process.env.REACT_APP_URL}/blogs/add-blogs`, data, {
      headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
    })
    .then((res) => {
      return dispatch({ type: ADD_BLOG_SUCCESS, payload: res.data.msg });
    })
    .catch((err) => {
      return dispatch({ type: ADD_BLOG_FAILURE });
    });
};
