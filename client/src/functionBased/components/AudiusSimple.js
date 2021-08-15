import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from '../../contexts/ThemeStore';

import { sample } from "./AudiusHost";

import Button from "./Button";

const Artwork = styled.img`
  overflow: hidden;
  border-radius: 50px;
  display: block;
  box-shadow: gray;
`;

const TrackTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const Artist = styled.h3`
  font-size: 20px;
  color: ${(props) => props.theme.text};
`;

const MusicPlayer = styled.audio`
  position: fixed;
  background-color: ${(props) => props.theme.background};
`;

const Audius = (props) => {
  const { theme } = useContext(ThemeContext);
  // const host, setHost] = useState(props.host);
  const [track, setTrack] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [streamUrl, setStreamUrl] = useState(null);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const appName = "CHILL-WITH-AUDIUS";

  // Get the tracks when we initialize component with host or theme/genre changes
  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const genre = theme;
        const res = await fetch(`${props.host}/v1/tracks/trending?genre=${genre}&limit=1&timeRange=week&app_name=${appName}`);
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
  }, [props.host, theme]);

  // Keep on shufflin'
  const shuffle = () => {
    setTrack(sample(tracks));
  };

  // Need to get the stream from Audius when track changes
  useEffect(() => {
    if (track) {
      // Clear state in preparation for new data
      // setError(false);
      // setLoading(true);
      
      fetch(`${props.host}/v1/tracks/${track.id}/stream`)
      .then(response => {
        if (response.url === null) {
          throw new Error("getStreamUrl");
        }
        setStreamUrl(response.url);
        // setLoading(false);
      })
      .catch(err => {
        // setError(true);
        // setLoading(false);
        console.log(err.message);
      });
    } else {
      console.error("No track to stream");
    }
  }, [props.host, track]);

  // Autoplay current track as soon as we update the stream URL
  useEffect(() => {
    const player = document.querySelector("audio");
    if (player && streamUrl) {
      player.play();
    } else {
      console.error(player);
    }
  }, [streamUrl]);

  return track && (
    <>
        <Artwork src={track.artwork['480x480']} alt='artwork' />

        
        <TrackTitle>
          { track.title }
        </TrackTitle>

        <Artist>
          { track.user.name }
        </Artist>

        <p>Theme is {theme} & Genre is { track.genre }</p>

        <Button onClick={shuffle}>Shuffle</Button>
        <MusicPlayer id="player" src={streamUrl} onEnded={shuffle} controls type="audio/mpeg" />
    </>
  );
};

export default Audius;