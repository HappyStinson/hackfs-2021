import React from "react";

import { useParams } from "react-router-dom";

const SinglePage = () => {
  const aboutData = [
    {
      slug: "about-app",
      title: "About the App",
      description:
        "My project for ETHGlobal HackFS 2021 Hackathon! Shuffle trending music while reading information about the selected genre. Uses the Audius HTTP API and Wikipedia API.",
    },
    {
      slug: "about-author",
      title: "About the Hacker",
      description:
        "Rasmus Nordling from 🇸🇪 Blockchain Developer & Musician!",
    },
    {
      slug: "about-audius",
      title: "About Audius",
      description:
        "Audius is a digital streaming service that connects fans directly with artists and exclusive new music. It does this by being fully decentralized: Audius is owned and run by a vibrant, open-source community of artists, fans, and developers all around the world. Audius is used by 100s of thousands of listeners and artists every month, and is now home to nearly 100,000 tracks, many of which are exclusively shared on the network. Check out https://audius.org/ and https://audius.co/."
    }
  ];

  const { slug } = useParams();
  const aboutContent = aboutData.find(item => item.slug === slug);
  const { title, description } = aboutContent;

  return (
    <div className="main__content">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
};

export default SinglePage