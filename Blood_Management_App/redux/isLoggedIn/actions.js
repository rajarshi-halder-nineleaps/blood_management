import { CHECK_USER_LOGIN } from "./actionTypes";

export const checkUserLogin = (token) =>({type: CHECK_USER_LOGIN, token: token});