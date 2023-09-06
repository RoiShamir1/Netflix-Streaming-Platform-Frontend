import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Main } from "../../Context/Main";
import ReactPlayer from "react-player";
import axios from "axios";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import "./WatchPage.scss";

const WatchPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(Main);
  const params = useParams();
  const { id } = params;

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate("/?redirect=/watch");
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
    <div className="watch">
      <Link className="back" to="/home">
        <ArrowBackIosNewOutlinedIcon />
        Home
      </Link>
      <ReactPlayer controls={true} className="video" height="100%" width="100%" url={item ? item.movie : ""} playing={true}></ReactPlayer>
    </div>
  );
};

export default WatchPage;
