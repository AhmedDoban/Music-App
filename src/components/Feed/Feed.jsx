import React from "react";
import { IconContext } from "react-icons";
import { MdFavorite } from "react-icons/md";
import { tracks } from "../../Tracks";
import "./Feed.css";
function Feed() {
  return (
    <React.Fragment>
      <div className="Feed">
        {tracks?.map((list, index) => (
          <div
            className="card"
            key={index}
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <img src={list.image} className="image" alt="Playlist-Art" />
            <p className="title">{list.title}</p>
            <p className="subtitle">{list.artist} Songs</p>
            <div className="fade">
              <IconContext.Provider value={{ size: "30px", color: "#E99D72" }}>
                <MdFavorite />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
export default Feed;
