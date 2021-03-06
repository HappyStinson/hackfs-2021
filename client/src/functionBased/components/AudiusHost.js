import React, { useEffect, useState } from 'react'

import AudiusSimple from "./AudiusSimple";

export const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const selectHost = async () => {
  const res = await fetch('https://api.audius.co');
  const hosts = await res.json();
  return sample(hosts.data);
};

const AudiusHost = () => {
  const [host, setHost] = useState(null);

  useEffect(() => {
    const fetchHost = async () => {
      setHost(await selectHost());
    };
    fetchHost();
  }, []);

  return host && (
    <>
      <AudiusSimple host={host} />
    </>
  );
};

export default AudiusHost;