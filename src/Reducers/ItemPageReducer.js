import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "./Actions";

export const ItemPageReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true };
    case GET_SUCCESS:
      return { ...state, item: payload, loading: false };
    case GET_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
