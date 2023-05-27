import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <React.Fragment>
      <div className="login">
        <div className="container">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="logo-spotify"
            className="logo"
          />
          <Link
            to={`${process.env.REACT_APP_AUTH_END_POINT}client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=${process.env.REACT_APP_SCOPES}&response_type=token&show_dialog=true`}
          >
            <div className="login-btn">LOG IN</div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Login;
