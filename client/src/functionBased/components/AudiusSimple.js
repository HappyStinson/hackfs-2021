import React, { useState, useEffect, useContext } from "react";

import { ThemeContext } from '../../contexts/ThemeStore';

import { sample } from "./AudiusHost";

import Button from "./Button";

const Audius = (props) => {
  const [host, setHost] = useState(props.host);
  const [track, setTrack] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [responseObj, setResponseObj] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [streamUrl, setStreamUrl] = useState(null);
  const { theme } = useContext(ThemeContext);

  const appName = "CHILL-WITH-AUDIUS";

  // Get the tracks when we initialize component with host
  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch(`${host}/v1/tracks/trending?limit=1&timeRange=week&app_name=${appName}`);
        const json = await res.json();
        const track = sample(json.data);
        setTrack(track);
        setTracks(json.data);
        console.log("fetchTrack successful!");
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrack();
  }, [host]);

  // Keep on shufflin'
  const shuffle = () => {
    const newTrack = sample(tracks);
    setTrack(newTrack);
    console.log("New Track!");
    console.log(newTrack.title);
  };

  // Need to get the stream from Audius
  const getStreamUrl = () => {
    // Clear state in preparation for new data
    setError(false);
    setLoading(true);

    setResponseObj({});
    
    fetch(`${host}/v1/tracks/${track.id}/stream`)
    .then(response => {
      if (response.url === null) {
        throw new Error("getStreamUrl");
      }
      setStreamUrl(response.url);
      setLoading(false);
    })
    .catch(err => {
      setError(true);
      setLoading(false);
      console.log(err.message);
    });
  };

  // Autoplay current track as soon as we update the stream URL
  useEffect(() => {
    const player = document.getElementById("player");
    if (player && streamUrl) {
      player.play();
    } else {
      console.error(player);
    }
  }, [streamUrl]);

  return track && (
    <>

      <div className="topTrack">
        <div className="artwork">
          <img src={track.artwork['480x480']} alt='artwork' />
        </div>

        <audio id="player" src={streamUrl} onEnded={shuffle} controls type="audio/mpeg" />
        
        <div className="title">
          { track.title }
        </div>
        <div className="artist">
          { track.user.name }
        </div>

        <p>Theme is {theme} & Genre is { track.genre }</p>

        <Button onClick={getStreamUrl}>Listen Now</Button>
        <Button onClick={shuffle}>Shuffle</Button>
      </div>
    </>
  );
};

export default Audius;