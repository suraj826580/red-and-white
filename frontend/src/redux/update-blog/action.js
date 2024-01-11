import {
  UPDATE_BLOG_FAILURE,
  UPDATE_BLOG_REQ,
  UPDATE_BLOG_SUCCESS,
} from "./action-types";
import axios from "axios";
export const updateBlog = (data) => (dispatch) => {
  dispatch({ type: UPDATE_BLOG_REQ });
  return axios
    .patch(`${process.env.REACT_APP_URL}/blogs/edit-blog/${data._id}`, data, {
      headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
    })
    .then((res) =>
      dispatch({ type: UPDATE_BLOG_SUCCESS, payload: res.data.message })
    )
    .catch((err) => dispatch({ type: UPDATE_BLOG_FAILURE }));
};
