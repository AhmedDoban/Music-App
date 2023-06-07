import React from "react";
import "./Widgets.css";
import { tracks } from "../../../Tracks";

export default function Widgets() {
  return (
    <React.Fragment>
      <div className="widgetcard-body">
        <div className="card">
          <p className="widget-title">Similar Artists</p>
          {tracks.slice(0, 4).map((track) => (
            <div className="entry-body ">
              <img src={track.image} alt="Sia" className="entry-image" />
              <div className="entry-right-body flex">
                <p className="entry-title">{track.title}</p>
                <p className="entry-subtitle">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <p className="widget-title">Made For You</p>
          {tracks.slice(0, 4).map((track) => (
            <div className="entry-body ">
              <img src={track.image} alt="Sia" className="entry-image" />
              <div className="entry-right-body flex">
                <p className="entry-title">{track.title}</p>
                <p className="entry-subtitle">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <p className="widget-title">New Releases</p>
          {tracks.slice(0, 4).map((track) => (
            <div className="entry-body ">
              <img src={track.image} alt="Sia" className="entry-image" />
              <div className="entry-right-body flex">
                <p className="entry-title">{track.title}</p>
                <p className="entry-subtitle">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
