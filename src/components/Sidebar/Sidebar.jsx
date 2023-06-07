import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoLibrarySharp } from "react-icons/io5";

function Sidebar(props) {
  useEffect(() => {}, [props.Token]);

  const HandleLogout = () => {
    localStorage.clear();
    console.log(props.Token);
    props.SetToken(false);
  };

  return (
    <React.Fragment>
      <div className={`Sidebar ${props.active}`}>
        <div className="avatar">
          <img src={require("../../assets/img/avatar.jpg")} alt="avatar" />
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
