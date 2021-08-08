import React from "react";

import { useParams } from "react-router-dom";

const SinglePage = () => {
  const aboutData = [
    {
      slug: "about-app",
      title: "About the App",
      description:
        "My project for ETHGlobal HackFS 2021 Hackathon! A text-based NFT adventure game, introducing players to the blockchain. This game presents a text-based interface in the browser to allow players to engage in a story that will educate them on different topics around the blockchain. Players can trade and exchange items found in the game. It will feature music from the Audius API.",
    },
    {
      slug: "about-author",
      title: "About the Hacker",
      description:
        "Rasmus Nordling from 🇸🇪 Blockchain Developer & Musician!",
    },
  ];

  const { slug } = useParams();
  const aboutContent = aboutData.find(item => item.slug === slug);
  const { title, description } = aboutContent;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
};

export default SinglePage