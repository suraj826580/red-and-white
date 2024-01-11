import axios from "axios";
import {
  GET_SIGN_IN_FAILURE,
  GET_SIGN_IN_REQ,
  GET_SIGN_IN_SUCCESS,
} from "./actions-types";

export const getSignUp = (data) => (dispatch) => {
  dispatch({ type: GET_SIGN_IN_REQ });
  return axios
    .post(`${process.env.REACT_APP_URL}/user/register`, data)
    .then((res) =>
      dispatch({ type: GET_SIGN_IN_SUCCESS, payload: res.data.msg })
    )
    .catch((err) => dispatch({ type: GET_SIGN_IN_FAILURE }));
};
