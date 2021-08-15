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

  const { theme } = useContext(ThemeContext);

  const getTrack = (theme) => {
    setError(false);
    setResponseObj({});
    setLoading(true);

    const genre = theme;
    // console.log(`AudiusSimple: ${host}`);

    fetch(`${host}/v1/tracks/trending?genre=${genre}&limit=1&timeRange=week?app_name=EXAMPLEAPP`)
      .then(response => response.json())
      .then(response => {
        setResponseObj(sample(response.data)); // not really using this here
        const t = sample(response.data);
        setTrack(t);
        console.log("Response data:");
        console.log(response.data);
        console.log("Track:");
        console.log(t);
        setTracks(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(`Error fetching Audius tracks. ${err.message}`);
      });
    };

  useEffect(() => {
    getTrack(theme);
    /* setError(false);
    setResponseObj({});
    setLoading(true);

    const genre = theme;
    // console.log(`AudiusSimple: ${host}`);

    fetch(`${host}/v1/tracks/trending?genre=${genre}&limit=1&timeRange=week?app_name=EXAMPLEAPP`)
      .then(response => response.json())
      .then(response => {
        setResponseObj(sample(response.data)); // not really using this here
        setTrack(sample(response.data));
        console.log(`Response data: ${response.data}`)
        setTracks(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(`Error fetching Audius tracks. ${err.message}`);
      }); */
  }, [theme]);

  const getRandomTrack = () => {
    const newTrack = sample(tracks);
    setTrack(newTrack);

    // Play the track
  };

  return track && (
    <>
      <div className="topTrack">
        <div className="artwork">
          <img src={track.artwork['150x150']} alt='artwork' />
        </div>
        <div className="title">
          { track.title }
        </div>
        <div className="artist">
          { track.user.name }
        </div>

        <p>Theme is {theme} & Genre is { track.genre }</p>

        <Button onClick={getRandomTrack}>Keep 'em Coming</Button>
      </div>
    </>
  );
};

export default Audius;