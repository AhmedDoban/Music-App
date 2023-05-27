import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoLibrarySharp } from "react-icons/io5";
import axios from "axios";

function Sidebar(props) {
  const [img, SetImg] = useState(require("../../assets/img/avatar.jpg"));

  useEffect(() => {
    const GetUSer = async () => {
      if (props.Token) {
        await axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: "Bearer " + props.Token,
            },
          })
          .then((data) => SetImg(data.data.images[0].url));
      }
    };
    GetUSer();
  }, [props.Token]);

  const HandleLogout = () => {
    localStorage.clear();
    props.SetToken("");
  };
  return (
    <React.Fragment>
      <div className={`Sidebar ${props.active}`}>
        <div className="avatar">
          <img src={img} alt="avatar" />
        </div>
        <ul className="navigators">
          <li>
            <NavLink to="Feed">
              <MdOutlineSpaceDashboard />
              <span>Feed </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="Trending">
              <i className="fa-brands fa-gripfire"></i> <span>Trending</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="Player">
              <i className="fa-solid fa-play"></i>
              <span>Player</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="Favorites">
              <i className="fa-solid fa-heart"></i>
              <span>Favorites</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="" end>
              <IoLibrarySharp />
              <span>Library</span>
            </NavLink>
          </li>
        </ul>
        <div className="setting">
          <Link to="/" onClick={() => HandleLogout()}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Sidebar;
