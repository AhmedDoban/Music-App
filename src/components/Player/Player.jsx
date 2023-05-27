import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Player.css";
import axios from "axios";

function MusicPlayer(props) {
  const location = useLocation();

  const [Tracks, SetTracks] = useState([]);
  const [CurrentTracks, SetCurrentTracks] = useState({});
  const [CurrentTracksImg, SetCurrentTracksImg] = useState("");
  const [TrackIndex, SetTrackIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      const GetUSer = async () => {
        if (props.Token) {
          await axios
            .get(
              `https://api.spotify.com/v1/playlists/${location.state.id}/tracks`,
              {
                headers: {
                  Authorization: "Bearer " + props.Token,
                },
              }
            )
            .then((data) => {
              SetTracks(data.data.items);
              SetCurrentTracks(data.data?.items[0].track);
              SetCurrentTracksImg(
                data.data?.items[0].track.album?.images[0].url
              );
            });
        }
      };
      GetUSer();
    }
  }, [props.Token, location.state]);

  const HandleChange = (index) => {
    SetTrackIndex(index);
    SetCurrentTracks(Tracks[index]?.track);
    SetCurrentTracksImg(Tracks[index]?.track.album?.images[0].url);
  };

  return (
    <React.Fragment>
      <div className="MusicPlayer">
        {/******************** Left Data ****************************/}
        <div className="left"></div>
        {/******************** End Left Data ****************************/}

        {/******************** Right Data ****************************/}
        <div className="right">
          {/******************** Right Data cards ****************************/}
          <div className="SongCard">
            <div className="SongCard-img">
              <img src={CurrentTracksImg} alt="" />
              <img src={CurrentTracksImg} alt="" />
            </div>
            <div className="data">
              <div className="titel">
                <h5>{CurrentTracks.album?.name}</h5>
                {CurrentTracks.album?.artists.map((ar) => (
                  <span>- {ar.name}</span>
                ))}
              </div>

              <p>
                {CurrentTracks.album?.name} is an{" "}
                {CurrentTracks.album?.album_type} with{" "}
                {CurrentTracks.album?.total_tracks}
              </p>
              <p className="release_date">
                Release Date : {CurrentTracks.album?.release_date}
              </p>
            </div>
          </div>
          <div className="Queue">
            <p>Up Next</p>
            <div className="Queue-list">
              {Tracks.map((List, index) => (
                <p onClick={() => HandleChange(index)} key={index}>
                  <span>{List.track.name}</span>
                  <span>
                    {(List.track.duration_ms / (1000 * 60)).toFixed(2)}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
        {/******************** End Right Data ****************************/}
      </div>
    </React.Fragment>
  );
}
export default MusicPlayer;
