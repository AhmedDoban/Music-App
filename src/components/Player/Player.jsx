import React, { useState, useEffect, useRef } from "react";
import "./Player.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { tracks } from "../../Tracks";
import { useParams } from "react-router-dom";
import Controlls from "./Controlls";
import Widgets from "./widgets/Widgets";

function MusicPlayer(props) {
  const params = useParams();
  // State
  const [trackIndex, setTrackIndex] = useState(3);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { title, artist, image, audioSrc } = tracks[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
  const sliderEl = useRef();

  useEffect(() => {
    if (params.id) {
      setTrackIndex(params.id);
    }
  }, [params.id]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
        sliderEl.current.style.background = `linear-gradient(to right, #f50 ${0}%, #ccc ${0}%)`;
      } else {
        setTrackProgress(audioRef.current.currentTime);
        sliderEl.current.style.background = `linear-gradient(to right, #f50 ${
          (trackProgress / duration) * 100
        }%, #ccc ${(trackProgress / duration) * 100}%)`;
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
    sliderEl.current.style.background = `linear-gradient(to right, #f50 ${
      (trackProgress / duration) * 100
    }%, #ccc ${(trackProgress / duration) * 100}%)`;
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
      sliderEl.current.style.background = `linear-gradient(to right, #f50 ${
        (trackProgress / duration) * 100
      }%, #ccc ${(trackProgress / duration) * 100}%)`;
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, duration ,startTimer]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
      sliderEl.current.style.background = `linear-gradient(to right, #f50 ${
        (trackProgress / duration) * 100
      }%, #ccc ${(trackProgress / duration) * 100}%)`;
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="MusicPlayer">
        {/******************** Left Data ****************************/}
        <div className="left">
          <div className="top">
            <div className="CircularProgressbar">
              <CircularProgressbarWithChildren
                value={duration ? `${(trackProgress / duration) * 100}` : "0"}
                circleRatio={0.95}
                styles={{
                  trail: {
                    strokeLinecap: "round",
                    transform: "rotate(-220deg)",
                    transformOrigin: "center center",
                  },
                  path: {
                    strokeLinecap: "round",
                    transform: "rotate(-220deg)",
                    transformOrigin: "center center",
                  },
                }}
              >
                <div className="data">
                  <img
                    src="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
                    alt="disk"
                    className={isPlaying ? "active" : "null"}
                  />
                  <img
                    src={image}
                    alt="soundImg"
                    className={isPlaying ? "active" : "null"}
                  />
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <div className="Song-body">
              <div className="titel"> {title}</div>
              <div className="artists">
                <span>{artist} </span>
              </div>
              <div className="song-duration">
                <p className="duration">0:00</p>
                <div className="wave">
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                  <div className={`box ${isPlaying ? "active" : null}`}></div>
                </div>
                <p className="duration">
                  {duration
                    ? (duration / 60).toFixed(2).replace(".", " : ")
                    : "loading"}
                </p>
              </div>
              <Controlls
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                toNextTrack={toNextTrack}
                toPrevTrack={toPrevTrack}
              />
            </div>
          </div>
          <div className="bottom">
            <Widgets />
          </div>
        </div>
        {/******************** End Left Data ****************************/}

        {/******************** Right Data ****************************/}
        <div className="right">
          {/******************** Right Data cards ****************************/}
          <div className="SongCard">
            <div className="SongCard-img">
              <img src={image} alt="" />
              <img src={image} alt="" />
            </div>
            <div className="data">
              <input
                type="range"
                value={trackProgress}
                size="small"
                min={0}
                step={1}
                max={duration ? duration : `${duration}`}
                onChange={(e) => onScrub(e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
                className="rangeStyle"
                ref={sliderEl}
              />
            </div>
            <div className="data">
              <div className="titel">
                <h5>{title}</h5>
                <span>{artist}</span>
              </div>
              <p className="release_date">Release Date : 2019</p>
            </div>
          </div>
          <div className="Queue">
            <p>Up Next</p>
            <div className="Queue-list">
              {tracks.map((List, index) => (
                <p
                  onClick={() => setTrackIndex(index)}
                  key={index}
                  className={index === trackIndex ? "active" : ""}
                >
                  <span>{List.title}</span>
                  <span>{List.duration}</span>
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
