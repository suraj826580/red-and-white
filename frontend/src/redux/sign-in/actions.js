import axios from "axios";
import {
  GET_LOGIN_FAILURE,
  GET_LOGIN_REQ,
  GET_LOGIN_SUCCESS,
} from "./action-types";

export const getAuth = (data) => (dispatch) => {
  dispatch({ type: GET_LOGIN_REQ });
  return axios
    .post(`${process.env.REACT_APP_URL}/user/login`, data)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      return dispatch({
        type: GET_LOGIN_SUCCESS,
        payload: { msg: res.data.message, token: res.data.token },
      });
    })
    .catch((err) => {
      return dispatch({ type: GET_LOGIN_FAILURE });
    });
};
