import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./action";
export const Log = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
