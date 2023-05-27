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

function Home() {
  const [active, SetActive] = useState("");
  const [Token, SetToken] = useState("");

  useEffect(() => {
    const Hash = window.location.hash;
    const LoaclToken = localStorage.getItem("Token");
    window.location.hash = "";
    if (!LoaclToken && Hash) {
      localStorage.setItem("Token", Hash.split("&")[0].split("=")[1]);
      SetToken(Hash.split("&")[0].split("=")[1]);
    } else {
      SetToken(LoaclToken);
    }
  }, [Token]);

  return Token ? (
    <React.Fragment>
      <div className="home">
        <div
          className="togle"
          onClick={() => SetActive(active ? "" : "active")}
        >
          <i className="fa-solid fa-bars"></i>
        </div>

        <Sidebar active={active} SetToken={SetToken} Token={Token} />
        <div className={`content ${active}`}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Library Token={Token} />} />
              <Route path="/Feed" element={<Feed Token={Token} />} />
              <Route path="/Trending" element={<Trending Token={Token} />} />
              <Route path="/Player" element={<MusicPlayer Token={Token} />} />
              <Route path="/Favorites" element={<Favorites Token={Token} />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Login />
  );
}
export default Home;
