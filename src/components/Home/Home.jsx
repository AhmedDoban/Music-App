import React, { Suspense, lazy, useEffect, useState } from "react";
import "./Home.css";
import { Route, Routes } from "react-router-dom";

import Login from "../Login/Login";
import Sidebar from "../Sidebar/Sidebar";
const Library = lazy(() => import("./../Library/Library"));
const Feed = lazy(() => import("./../Feed/Feed"));
const Trending = lazy(() => import("./../Trending/Trending"));
const MusicPlayer = lazy(() => import("./../Player/Player"));
const Favorites = lazy(() => import("./../Favorites/Favorites"));

function Home(props) {
  const [active, SetActive] = useState("");

  useEffect(() => {
    const LoaclToken = localStorage.getItem("Token");
    if (LoaclToken !== null) {
      props.SetToken(LoaclToken);
    }
  }, [props.Token]);

  return props.Token ? (
    <React.Fragment>
      <div className="home">
        <div
          className="togle"
          onClick={() => SetActive(active ? "" : "active")}
        >
          <i className="fa-solid fa-bars"></i>
        </div>

        <Sidebar
          active={active}
          SetToken={props.SetToken}
          Token={props.Token}
        />
        <div className={`content ${active}`}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Library />} />
              <Route path="/Feed" element={<Feed />} />
              <Route path="/Trending" element={<Trending />} />
              <Route path="/Player/:id?" element={<MusicPlayer />} />
              <Route path="/Favorites" element={<Favorites />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Login SetToken={props.SetToken} />
  );
}
export default Home;
