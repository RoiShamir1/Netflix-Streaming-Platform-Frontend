import { useReducer, React, createContext, useEffect } from "react";
import { MainReducer } from "../Reducers/MainReducer";

//export const Main = createContext();

const initState = {
  userInfo: localStorage.getItem("userInfo") !== null ? JSON.parse(localStorage.getItem("userInfo")) : null,
  myList: localStorage.getItem("myList") !== null ? JSON.parse(localStorage.getItem("myList")) : null,
  isFetching: false,
  error: false,
};

export const Main = createContext(initState);

export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initState);
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    localStorage.setItem("myList", JSON.stringify(state.myList));
  }, [state.userInfo, state.myList]);

  return (
    <Main.Provider
      value={{
        userInfo: state.userInfo,
        isFetching: state.isFetching,
        error: state.error,
        myList: state.myList,
        dispatch,
      }}
    >
      {children}
    </Main.Provider>
  );

  // const [state, dispatch] = useReducer(MainReducer, initState);
  // const body = {
  //   state,
  //   dispatch,
  // };
  // return <Main.Provider value={body}>{props.children}</Main.Provider>;
};
