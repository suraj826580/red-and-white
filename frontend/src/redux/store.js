import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { AuthReducer } from "./sign-in/action-reducer.js";
import { signUpReducer } from "./sign-up/action-reducer.js";
import { blogReducer } from "./get-blogs/action-reducer.js";
import { addBlogReducer } from "./add-blogs/action-reducer.js";
import { UpdateBlogReducer } from "./update-blog/action-reducer.js";
import { dashboardBlogs } from "./get-dashboard-blogs/action-reducer.js";
import { userReducer } from "./update-profile/action-reducer.js";
const rootReducer = combineReducers({
  AuthReducer,
  signUpReducer,
  blogReducer,
  addBlogReducer,
  UpdateBlogReducer,
  dashboardBlogs,
  userReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
