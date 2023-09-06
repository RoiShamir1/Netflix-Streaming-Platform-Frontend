import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { Main } from "../Context/Main";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from "axios";
import "./MainItems.scss"

const MainItems = ({ type }) => {
  const navigate = useNavigate();
  //const { userInfo } = useContext(Main);
  const [randomItem, setRandomItem] = useState({});
  //console.log(type);

  useEffect(() => {
    const getRandomItem = async (type) => {
      try {
        let path = "/items/random";
        let pathtype = type ? `?type=${type}` : "";
        const responce = await axios.get(path + pathtype, {
        //   headers: {
        //     authorization: `Bearer ${userInfo.token}`,
        //   },
        });
        if (responce) setRandomItem(responce.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomItem();
    const interval = setInterval(() => {
      getRandomItem();
    }, 4000);
    return () => clearInterval(interval);
  }, [type]);

  return (
    <div className="mainItem">
      {/* {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
        </div>
      )} */}
      <img src={randomItem.img} alt={randomItem.title} />
      <div className="info">
        <img src={randomItem.imgTitle} alt={randomItem.title} />
        <span className="desc">{randomItem.description}</span>
        <div className="buttons">
          <button className="play" onClick={() => navigate(`/watch/${randomItem._id}`)}>
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button className="more" onClick={() => navigate(`/details/${randomItem._id}`)}>
            <InfoOutlinedIcon />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainItems;
