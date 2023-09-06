import React, { useReducer, useState, useEffect, useContext } from "react";
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from "../../Reducers/Actions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Main } from "../../Context/Main";
import Navbar from "../../Components/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "./SearchPage.scss";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true };
    case GET_SUCCESS:
      return {
        ...state,
        loading: false,
        items: payload.items,
        page: payload.page,
        pages: payload.pages,
        countItems: payload.countItems,
      };
    case GET_FAIL:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

const SearchPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const genre = searchParams.get("genre") || "all";
  const query = searchParams.get("query") || "all";
  const [searchText, setSearchText] = useState(query);
  const [genres, setGenres] = useState([]);
  //const [items, setItems] = useState([]);
  const { userInfo } = useContext(Main);

  const [{ items }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      navigate("/?redirect=/search");
    }
  }, [userInfo, navigate]);

  // const genres = [
  //   'Action',
  //   'Comedy',
  //   'Fantasy',
  //   'Detective',
  //   'Horror',
  //   'Animation',
  // ];

  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await axios.get(`/items/genres`);
        setGenres(data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getGenres();
  }, [dispatch]);

  useEffect(() => {
    textStart();
  }, [genre, searchText]);

  const textStart = async () => {
    const queryParams = [];
    if (genre !== "all") {
      queryParams.push(`genre=${genre}`);
    }
    if (searchText !== "all") {
      queryParams.push(`query=${searchText}`);
    }
    const queryString = queryParams.length > 0 ? "?" + queryParams.join("&") : "";

    navigate(queryString);
    //window.history.replaceState({}, null, `/search${queryString}`);
  };
  // const textStart = async () => {
  //   navigate(
  //     `${genre || searchText ? "?" : ""}${genre ? `genre=${genre}` : ""}${genre && searchText ? "&" : ""}${searchText ? `query=${searchText}` : ""}`
  //   );
  // };

  // useEffect(() => {
  //   setSearchText(query);

  //   const getData = async () => {
  //     try {
  //       dispatch({ type: GET_REQUEST });

  //       const { data } = await axios.get(
  //         "item/search" + `${genre || query ? "?" : ""}${genre ? `genre=${genre}` : ""}${genre && query ? "&" : ""}${query ? `query=${query}` : ""}`
  //       );
  //       dispatch({ type: GET_SUCCESS, payload: data });
  //       setItem(data.data);
  //     } catch (err) {
  //       dispatch({ type: GET_FAIL, payload: err.message });
  //     }
  //   };

  //   getData();
  // }, [genre, query]);

  useEffect(() => {
    setSearchText(query);

    const getData = async () => {
      try {
        dispatch({ type: GET_REQUEST });

        let data = {};
        if (genre && query) {
          data = await axios.get(`/items/search?&genre=${genre}&query=${query}`);
        } else if (!genre) {
          data = await axios.get(`/items/search?&query=${query}`);
        } else if (!query) {
          data = await axios.get(`/items/search?genre=${genre}`);
        }
        dispatch({ type: GET_SUCCESS, payload: data.data });
        //console.log("item", item);
        //setItem(data.data);
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: err.message });
      }
    };

    getData();
  }, [genre, query]);

  return (
    <>
      <div className="main">
        <Navbar className="nav" />

        <div className="search">
          <div className="options">
            <div className="searchGroup">
              <input type="text" className="searchInput" onChange={(e) => setSearchText(e.target.value)} />
              <button className="searchbutton" onClick={() => textStart()}>
                <SearchIcon />
              </button>
            </div>
            <ul className="genres">
              <li onClick={() => navigate(searchText ? `?query=${searchText}` : "")}>Genre</li>
              {genres.map((genre, i) => (
                <li value={genre} key={i} onClick={() => navigate(searchText ? `?genre=${genre}&query=${searchText}` : `?genre=${genre}`)}>
                  {genre}
                </li>
              ))}
            </ul>
          </div>
          <div className="results">
            <h3 className="resultText">
              Results: {query ? `input: ${query}, ` : " "} {genre ? `genre: ${genre}` : ""}{" "}
              {query || genre ? (
                <CloseIcon
                  className="clearbutton"
                  onClick={() => {
                    navigate("/search");
                  }}
                />
              ) : (
                ""
              )}{" "}
            </h3>
            <div className="results-items">
              <h2>Items:</h2>
              <div className="main-results">
                {items &&
                  items.map((item, i) => (
                    <Link to={{ pathname: `/details/${item._id}` }} className="link">
                      <img src={item.imgThumb} alt={item.title} key={i} className="content" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
