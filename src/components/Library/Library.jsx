import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./Library.css";

function Library(props) {
  const Navigate = useNavigate();
  const [PlayList, SetPlayList] = useState();

  useEffect(() => {
    const GetUSer = async () => {
      if (props.Token) {
        await axios
          .get("https://api.spotify.com/v1/me/playlists", {
            headers: {
              Authorization: "Bearer " + props.Token,
            },
          })
          .then((data) => SetPlayList(data.data.items));
      }
    };
    GetUSer();
  }, [props.Token]);

  const HandlePlayList = (id) => {
    Navigate("/Player", { state: { id: id } });
  };
  return (
    <React.Fragment>
      <div className="Library">
        {PlayList?.map((list) => (
          <div
            className="card"
            key={list.id}
            onClick={() => HandlePlayList(list.id)}
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <img
              src={list.images[0].url}
              className="image"
              alt="Playlist-Art"
            />
            <p className="title">{list.name}</p>
            <p className="subtitle">{list.tracks.total} Songs</p>
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
