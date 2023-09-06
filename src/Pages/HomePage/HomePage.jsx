import React, { useContext, useEffect, useReducer } from "react";
import { Main } from "../../Context/Main";
import { useNavigate } from "react-router-dom";
import { HomePageReducer, initState } from "../../Reducers/HomePageReducer";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../Reducers/Actions";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import MainItems from "../../Components/MainItems";
import List from "../../Components/List";
import ErrorComponent from "../../Components/ErrorComponent";
import Loading from "../../Components/Loading";

const HomePage = ({ type }) => {
  const navigate = useNavigate();
  const [{ loading, error, lists }, dispatch] = useReducer(HomePageReducer, initState); //lists
  const { userInfo , myList, dispatch: mainDispatch } = useContext(Main);
  //const {userInfo , myList} = state;
  //const [lists , setLists] = useState({})

  useEffect(() => {
    if (!userInfo) {
      navigate("/?redirect=/home");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    const getMyList = async () => {
      try {
        //console.log(userInfo)
        const results = await axios.get(`/lists/get?type=${userInfo._id}`, {
          headers: {
            authorization: `${userInfo.token}`,
          },
        });
        var data = results.data[0];
        //console.log(data);
        if (data) mainDispatch({ type: "ADD_TO_MY_LIST", payload: data });
      } catch (err) {
        console.log(err);
      }
    };
    getMyList();
  }, [userInfo , mainDispatch]);

  useEffect(() => {
    const getRandomLists = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const results = await axios.get(`/lists/get${type ? "?type=" + type : ""}`, {
          headers: {
            authorization: `${userInfo.token}`,
          },
        });
        //console.log(results.data);

        dispatch({
          type: GET_SUCCESS,
          payload: results.data.sort(() => Math.random() - 0.5),
        });

        //console.log(type);
      } catch (error) {
        console.log("Error fetching random lists:", error);
        dispatch({ type: GET_FAIL, payload: error.message });
      }
    };
    getRandomLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="home">
      <Navbar />
      {/* {console.log("myList:", myList)} */}
      <MainItems type={type} className="mainItem" />
      {myList && myList.items && myList.items.length > 0 ? <List className="list" list={myList} /> : null}
      {loading ? <Loading /> : error ? <ErrorComponent error={error} /> : lists.map((list, i) => <List className="list" list={list} key={i} />)}
    </div>
  );
};

export default HomePage;
