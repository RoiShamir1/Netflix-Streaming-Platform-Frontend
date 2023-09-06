import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from "./Actions.js";

export const initState = {
  loading: true,
  error: "",
  lists: [],
};

export const HomePageReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true };
    case GET_SUCCESS:
      //console.log(payload);
      return { ...state, loading: false, lists: payload };
    case GET_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
