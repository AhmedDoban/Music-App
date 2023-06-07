import React from "react";
import "./Controlls.css";
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5";
import { IconContext } from "react-icons";
import { FaPause } from "react-icons/fa";

function Controlls({ setIsPlaying, isPlaying, toNextTrack, toPrevTrack }) {
  return (
    <div className="controls-wrapper">
      <IconContext.Provider value={{ size: "35px", color: "#C4D0E3" }}>
        <div className="controls-wrapper flex">
          <div className="action-btn flex" onClick={toPrevTrack}>
            <IoPlaySkipBack />
          </div>
          <div
            className={
              isPlaying ? "play-pause-btn flex active" : "play-pause-btn flex"
            }
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <FaPause /> : <IoPlay />}
          </div>
          <div className="action-btn flex" onClick={toNextTrack}>
            <IoPlaySkipForward />
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
}
export default Controlls;
