import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Main } from "../../Context/Main";
import axios from "axios";
import { USER_SIGNIN } from "../../Reducers/Actions";
import { toast } from "react-toastify";
import Logo from "../../Images/Netflix-Logo.png";
import "./SignUpPage.scss";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { userInfo, dispatch: ctxDispatch } = useContext(Main);
  //const { userInfo } = state;

  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submit = (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      toast.error("password must be the same");
      return;
    }
    axios
      .post("/users/signup", { username, email, password, })
      .then((res) => {
        ctxDispatch({ type: USER_SIGNIN, payload: res.data });
        navigate(redirect);
      })
      .catch((error) => {
        toast.error(error.message, {
          theme: "colored",
          hideProgressBar: true,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="signup">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={Logo} alt="" />
        </div>
        <div className="container">
          <form onSubmit={submit}>
            <h1>Sign up</h1>
            <input required type="text" onChange={(e) => setUserName(e.target.value)} placeholder="User name" />
            <input required type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email or number" />
            <input required type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input required type="password" onChange={(e) => setConfirmPass(e.target.value)} placeholder="Confirm password" />
            <button className="signupButton" type="submit">
              Sign up
            </button>
            <span>
              Have an account? {" "}
              <Link className="link link-signup" to={`/?redirect=${redirect}`}>
                Sign in here.
              </Link>
            </span>
            <small>This page is protected by Google reCAPTCHA to ensure you're not a bot.</small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
