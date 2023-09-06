import React, { useContext, useEffect, useState } from "react";
import "./DetailsPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../../Context/Main";
//import { ItemPageReducer } from "../../Reducers/ItemPageReducer";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from "axios";
import Navbar from "../../Components/Navbar";

const DetailsPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const { userInfo } = useContext(Main);
  const [item, setItem] = useState(null);
  //const [{ item }, dispatch] = useReducer(ItemPageReducer);

  //   const initialState = {
  //     loading: true,
  //     error: "",
  //     items: [],
  //   };

  useEffect(() => {
    if (!userInfo) {
      navigate("/?redirect=/details");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    const getItem = async () => {
      try {
        const apiItem = await axios.get(`/items/id/${id}`);
        setItem(apiItem.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getItem();
  }, [id, userInfo.token]);

  return (
    <div className="main">
      <Navbar />
      <div className="centered">
        <div className="details">
          <img className="picture" src={item ? item.imgVertical : ""} alt="img" />
          <div className="info">
            <h1>{item ? item.title : ""}</h1>
            <p>{item ? item.description : ""}</p>
            <p>Type: {item ? (item.isSeries ? "Series" : "Movie") : ""}</p>
            <p>Year: {item ? item.year : ""}</p>
            <p>Duration: {item ? item.duration : ""}</p>
            <p>Age restriction: {item ? item.limit : ""}+</p>
            <p>Genre: {item ? item.genre : ""}</p>
            <div className="buttons">
              <button className="play" onClick={() => navigate(`/watch/${item ? item._id : ""}`)}>
                <PlayArrowIcon />
                <span>Play</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
