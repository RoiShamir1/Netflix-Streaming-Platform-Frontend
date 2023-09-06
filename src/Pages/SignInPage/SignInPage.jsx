import React, { useContext, useState, useEffect } from "react";
import "./SignInPage.scss";
import axios from "axios";
import Logo from "../../Images/Netflix-Logo.png";
import { USER_SIGNIN } from "../../Reducers/Actions";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Main } from "../../Context/Main";
import { toast } from "react-toastify";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/home";

  const { isFetching, userInfo, dispatch: ctxDispatch } = useContext(Main);

  //const { userInfo } = state;
  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submit = (e) => {
    e.preventDefault();

    axios
      .post("/users/signin", { password, email })
      .then((res) => {
        console.log(res.data);
        ctxDispatch({ type: USER_SIGNIN, payload: res.data });
        navigate(redirect);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="signin">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={Logo} alt="" />
        </div>
        <div className="container">
          <form onSubmit={submit}>
            <h1>Sign in</h1>
            {/* <input required type="email" onChange={(e) => setEmail(e.target.value)} /> */}
            <div className="form">
              <input required type="email" onChange={(e) => setEmail(e.target.value)} />
              <label for="text" class="label-name">
                <span class="content-name">Email or number</span>
              </label>
            </div>
            <div className="form">
              <input required type="password" onChange={(e) => setPassword(e.target.value)} />
              <label for="text" class="label-name">
                <span class="content-name">Password</span>
              </label>
            </div>
            <button className="signinButton" onClick={submit} disabled={isFetching}>
              Sign in
            </button>
            <span>
              New to Netflix?{" "}
              <Link className="link link-signin" to={`/signup?redirect=${redirect}`}>
                Create one here.
              </Link>
            </span>
            <small>This page is for presentation only!.</small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
