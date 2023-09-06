import React, { useContext, useState } from "react";
import { Main } from "../Context/Main";
import { Link } from "react-router-dom";
import Logo from "../Images/Netflix-Logo.png";
import Chris from "../Images/ChrisHemsworth.jpg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from '@mui/icons-material/Search';
import "./Navbar.scss";
import { logOut } from "../Reducers/Actions";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, dispatch } = useContext(Main);

  const logoutHandler = () => {

    dispatch(logOut());

    // localStorage.removeItem('userInfo');
    // localStorage.removeItem()
    // window.location.reload();
  };

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/home">
            <img src={Logo} alt="Netflix" />
          </Link>
          <Link to="/home" className="link">
            Home
          </Link>
          <Link to="/home/series" className="link">
            Series
          </Link>
          <Link to="/home/movies" className="link">
            Movies
          </Link>
        </div>
        <div className="right">
          <Link className="link" to="/search">
            <SearchIcon className="icon"/>
          </Link>
          <img src={Chris} alt="" />
          <p className="username">{user ? user.username : ""}</p>
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span onClick={logoutHandler}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
