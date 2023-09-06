import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Main } from "../Context/Main";
import axios from "axios";
import ReactPlayer from "react-player";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import "./Item.scss";

const Item = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { myList, dispatch } = useContext(Main);
  //const navigate = useNavigate();
  const {userInfo } = useContext(Main);

  const addToMyListHandler = async () => {
    try {
      const results = await axios.get(`/lists/savetomylist/${item._id}`, {
        headers: {
          authorization: `${userInfo.token}`,
        },
      });
      dispatch({ type: "ADD_TO_MY_LIST", payload: results.data });
      //console.log(results.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const RemoveFromMyListHandler = async () => {
    try {
      const results = await axios.get(`/lists/removefrommylist/${item._id}`, {
        headers: {
          authorization: `${userInfo.token}`,
        },
      });
      //console.log(results.data);
      dispatch({ type: "ADD_TO_MY_LIST", payload: results.data });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="listItem" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="items">
          <Link to={{ pathname: `/details/${item._id}` }} className="link">
            <img src={item?.imgThumb} alt="" className="img-in-link" />
          </Link>
          {isHovered && (
            <>
              <Link to={{ pathname: `/details/${item._id}` }} className="link">
                <ReactPlayer className="video" height={145} width={300} url={item.trailer} playing={true}></ReactPlayer>
              </Link>
              <div className="itemInfo">
                <div className="icons">
                  <PlayArrowIcon className="icon link" />

                  {myList && myList.items && myList.items.find((x) => x._id === item._id) ? (
                    <RemoveIcon
                      className="icon"
                      onClick={() => {
                        RemoveFromMyListHandler();
                      }}
                    />
                  ) : (
                    <AddIcon
                      className="icon"
                      onClick={() => {
                        addToMyListHandler();
                      }}
                    />
                  )}

                  <ThumbUpOutlinedIcon className="icon" />
                  <ThumbDownOffAltOutlinedIcon className="icon" />
                </div>
                <Link to={{ pathname: `/details/${item._id}` }} className="link">
                  <div className="itemInfoTop">
                    <span>{item.duration}</span>
                    <span className="limit">+{item.limit}</span>
                    <span>{item.year}</span>
                  </div>
                  <div className="desc">{item.desc}</div>
                  <div className="genre">{item.genre}</div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Item;
