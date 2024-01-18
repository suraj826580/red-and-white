import {
  GET_BLOGS_LIST_FAILURE,
  GET_BLOGS_LIST_REQ,
  GET_BLOGS_LIST_SUCCESS,
} from "./actions-types";
import axios from "axios";
export const getBlogList = (dispatch) => {
  dispatch({ type: GET_BLOGS_LIST_REQ });
  axios
    .get(`${process.env.REACT_APP_URL}/blogs/get-our-blogs`, {
      headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
    })
    .then((res) => {
      dispatch({ type: GET_BLOGS_LIST_SUCCESS, payload: res.data.blogList });
    })
    .catch((err) => {
      dispatch({ type: GET_BLOGS_LIST_FAILURE });
    });
};
