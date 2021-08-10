import React, { useEffect, useState } from 'react'

import './AudiusApi.css'

/** Simple implementation of Audius HTTP API */

const selectHost = async () => {
  const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const res = await fetch('https://api.audius.co');
  const hosts = await res.json();
  return sample(hosts.data);
};

const AudiusHttpAPI = () => {
  const [track, setTrack] = useState(null);
  const [host, setHost] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [streamUrl, setStreamUrl] = useState(null);
  const [mp3, setMP3] = useState(null);

  const appName = "RAS-CRYPTO-ADVENTURE";

  useEffect(() => {
    const init = async () => {
      const host = await selectHost();
      const tracks = await fetch(`${host}/v1/tracks/trending?limit=1&timeRange=week?app_name=${appName}`);
      const json = await tracks.json();
      const topTrack = json.data[0];
      const mp3 = await fetch(`${host}/v1/tracks/${topTrack.id}/stream?app_name=${appName}`);
      console.log(mp3);
      setHost(host);
      setTrack(topTrack);
      setStreamUrl(mp3.url);
      setStreaming(true);
    }
    init();
  }, []);

  useEffect(() => {
    if (streaming) {
      const track = document.getElementsByClassName("audio-element")[0];
      setMP3(track);
      track.play();
    }
  }, [streaming]);

  const playMP3 = () => {
    if (mp3) {
      setStreaming(true);
      mp3.play();
    } else {
      alert("Can't play audio!");
    }
  };

  const stopMP3 = event => {
    if (event.key === "Enter") {
      if (mp3) {
        setStreaming(false);
        mp3.pause();
      } else {
        alert("Can't stop audio!");
      }
    }
  };

  return host && track && (
    <div>
      <h1>Audius HTTP API</h1>
        Audius Host: {host}
      <h2 onDoubleClick={playMP3}>Streaming? {JSON.stringify(streaming)}</h2>

      <div className="topTrack">
        <div className="artwork">
          <img src={track.artwork['150x150']} alt='artwork' />
        </div>
        <div className="title">
          {track.title}
        </div>
        <div className="artist">
          {track.user.name}
        </div>
        <audio className="audio-element">
          <source src={streamUrl}></source>
        </audio>
        <input
        type = "text"
        onKeyDown={stopMP3}
      />
      </div>

    </div>
  );
}

export default AudiusHttpAPI