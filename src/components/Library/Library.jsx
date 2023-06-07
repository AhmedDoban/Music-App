import React from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./Library.css";
import { tracks } from "../../Tracks";

function Library() {
  const Navigate = useNavigate();

  const HandlePlayList = (id) => {
    Navigate(`/Player/${id}`);
  };

  return (
    <React.Fragment>
      <div className="Library">
        {tracks?.map((list, index) => (
          <div
            className="card"
            key={index}
            onClick={() => HandlePlayList(index)}
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <img src={list.image} className="image" alt="Playlist-Art" />
            <p className="title">{list.title}</p>
            <p className="subtitle">{list.artist} Songs</p>
            <div className="fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
export default Library;
