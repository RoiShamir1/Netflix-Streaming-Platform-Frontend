import { USER_SIGNIN, USER_SIGNOUT, ADD_TO_MY_LIST} from "./Actions";

export const MainReducer = (state, { type, payload }) => {

  switch (type) {
    case USER_SIGNIN: {
      localStorage.setItem("userInfo", JSON.stringify(payload));  
      return { ...state, userInfo: payload };
    }
    case USER_SIGNOUT: {
      localStorage.removeItem("userInfo");
      return {
        ...state,
        userInfo: null,
        myList: null,
      };
    }
    case ADD_TO_MY_LIST: {
      localStorage.setItem("myList", JSON.stringify(payload)); 
      return { ...state, myList: payload };
    }
    default:
      return state;
  }
};
