import React, { useEffect, useState } from 'react'
import WikipediaAPI from '../../functionBased/components/WikipediaAPI';

import './AudiusApi.css'

/** Simple implementation of Audius HTTP API */

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const selectHost = async () => {
  const res = await fetch('https://api.audius.co');
  const hosts = await res.json();
  return sample(hosts.data);
};

const AudiusHttpAPI = () => {
  const [track, setTrack] = useState(null);
  const [host, setHost] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [streamUrl, setStreamUrl] = useState(null);
  const [user, setUser] = useState(null);

  const appName = "RAS-CRYPTO-ADVENTURE";

  useEffect(() => {
    const init = async () => {
      const host = await selectHost();
      // const tracks = await fetch(`${host}/v1/tracks/trending?limit=1&timeRange=week?app_name=${appName}`);
      const tracks = await fetch(`${host}/v1/tracks/trending?app_name=${appName}`);
      const json = await tracks.json();
      const topTrack = sample(json.data);
      const mp3 = await fetch(`${host}/v1/tracks/${topTrack.id}/stream?app_name=${appName}`);
      setHost(host);
      setTrack(topTrack);
      setUser(topTrack.user);
      setStreamUrl(mp3.url);
    }
    init();
  }, []);

  const play = () => {
    document.getElementById("player").play();
    setStreaming(true);
  };

  const pause = () => {
    document.getElementById("player").pause();
    setStreaming(false);
  };

  const remix = () => {
    if (track.remix_of['tracks']) {
      return <div>This song is a Remix!</div>
    } else {
      return <div>This song is the real deal bro!</div>
    }
  };

  return host && track && user && (
    <div>
      Audius Host: {host} <br />
      Stream URL: {streamUrl} <br />

      <h2>Track Response</h2>
        <div className="artwork">
          <img src={track.artwork['150x150']} alt='artwork' />
        </div>
        <p>
          Description: {track.description} <br />
          Genre: {track.genre} <br />
          Id: {track.id} <br />
          Mood: {track.mood} <br />
          Release date: {track.release_date}
        </p>
        {remix()}
        <p>
          Repost count: {track.repost_count} <br />
          Favorite count: {track.favorite_count} <br />
          Tags: {track.tags} <br />
        </p>
        <div className="title">
          Title: {track.title}
        </div>
        Duration: {track.duration} <br />
        Downloadable? {JSON.stringify(track.downloadable)} <br />
        Play count: {track.play_count} <br />
      
      <h2>User Response</h2>
      <p>
        Album count: {user['album_count']} <br />
        Bio: {user['bio']} <br />
      </p>
      <div className="artwork">
        Cover photo url: {user.cover_photo['640x']}
        <img src={user.cover_photo['640x']} alt='cover' />
      </div>
      <p>
        Followees: {user.followee_count} <br />
        Followers: {user.follower_count} <br />
        Handle: {user.handle} <br />
        Id: {user.id} <br />
        Verified? {JSON.stringify(user.is_verified)} <br />
        Location: {user.location} <br />
      </p>
      <div className="artist">
        Artist: {user.name}
      </div>
      <p>
        Playlist count: {user.playlist_count} <br />
      </p>
      <div className="artwork">
        <img src={user.profile_picture['150x150']} alt='user profile' />
      </div>
      <p>
        Repost count: {user.repost_count} <br />
        Track count: {user.track_count} <br />
      </p>
        
      <h2>
        Streaming? {JSON.stringify(streaming)}
      </h2>

      <div className="topTrack">
        <audio id="player">
          <source src={streamUrl}></source>
        </audio>
        <div>
          <button onClick={play}>Play</button>
          <button onClick={pause}>Pause</button>
{/*           <button onClick="document.getElementById('player').volume+=0.1">Volume Up</button>
          <button onClick="document.getElementById('player').volume-=0.1">Volume Down</button> */}
        </div>
      </div>

      <WikipediaAPI />

    </div>
  );
}

export default AudiusHttpAPI