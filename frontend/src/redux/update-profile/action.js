import {
  GET_USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQ,
} from "./action-types";
import axios from "axios";

export function getUserDetailsFunc(dispatch) {
  dispatch({ type: USER_DETAILS_REQ });
  return axios(`${process.env.REACT_APP_URL}/user/get-user`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
    },
  })
    .then((res) =>
      dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: res.data.user })
    )
    .catch((err) => dispatch({ type: USER_DETAILS_FAILURE }));
}

export function updateUserDetailsFunc(data) {
  return function (dispatch) {
    dispatch({ type: USER_DETAILS_REQ });
    return axios
      .post(`${process.env.REACT_APP_URL}`, data, {
        headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
}
