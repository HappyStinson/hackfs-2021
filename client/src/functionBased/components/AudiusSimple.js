import React, { useState, useEffect, useContext } from "react";

import { ThemeContext } from '../../contexts/ThemeStore';

import { sample } from "./AudiusHost";

const Audius = (props) => {
  const [host, setHost] = useState(props.host);
  const [track, setTrack] = useState(null);
  const [responseObj, setResponseObj] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setError(false);
    setResponseObj({});
    setLoading(true);

    const genre = theme;
    // console.log(`AudiusSimple: ${host}`);

    fetch(`${host}/v1/tracks/trending?genre=${genre}&limit=1&timeRange=week?app_name=EXAMPLEAPP`)
      .then(response => response.json())
      .then(response => {
        setResponseObj(sample(response.data)); // not really using this here
        setTrack(sample(response.data));
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(`Error fetching Audius tracks. ${err.message}`);
      });
  }, [theme]);

  return track && (
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
    </div>
  );
};

export default Audius;