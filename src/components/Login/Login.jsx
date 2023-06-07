import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login(props) {
  const HandleLogin = () => {
    localStorage.setItem("Token", true);
    props.SetToken(true);
  };
  return (
    <React.Fragment>
      <div className="login">
        <div className="container">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="logo-spotify"
            className="logo"
          />
          <Link to={`/`} onClick={() => HandleLogin()}>
            <div className="login-btn">LOG IN</div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Login;
