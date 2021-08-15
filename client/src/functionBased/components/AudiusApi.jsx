import React, { useEffect, useState } from 'react'
import WikipediaAPI from '../../functionBased/components/WikipediaAPI';

import './AudiusApi.css'
import classes from "./Form.module.css";

import Track from './Track';

/** Simple implementation of Audius HTTP API */

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

;

const AudiusAPI = () => {
  const [host, setHost] = useState(null);
  const [responseObj, setResponseObj] = useState({});
  const [genre, setGenre] = useState("Electronic");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const appName = "CHILL-WITH-AUDIUS";

  useEffect(() => {
    const selectHost = async () => {
      const res = await fetch('https://api.audius.co');
      const hosts = await res.json();
      setHost(sample(hosts.data));
    }
    selectHost();
  });

  const getTrack = (e) => {
    e.preventDefault();

    // Clear state in preparation for new data
    setError(false);
    setResponseObj({});
    setLoading(true);

    fetch(`${host}/v1/tracks/trending?genre=${genre}&limit=1&timeRange=week?app_name=${appName}`) // should use await?
      .then(response => response.json())
      .then(response => {
        setResponseObj(sample(response.data));
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err.message);
      });
  };

  return (
    <div>
      <h2>Find Current Trending Tracks In Selected Genre!</h2>
      
      <form onSubmit={getTrack}>

        <label className={classes.Radio}>
          <input
            type="radio"
            name="genres"
            checked={genre === "Electronic"}
            value="Electronic"
            onChange={(e) => setGenre(e.target.value)}
          />
          Electronic
        </label>

        <label className={classes.Radio}>
          <input
            type="radio"
            name="genres"
            checked={genre === "Rock"}
            value="Rock"
            onChange={(e) => setGenre(e.target.value)}
          />
          Rock
        </label>

        <button className={classes.Button} type="submit">Get Track</button>

      </form>

      <Track
        responseObj={responseObj}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default AudiusAPI;