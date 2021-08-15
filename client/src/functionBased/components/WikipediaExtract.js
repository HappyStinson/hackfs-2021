import React, { useState, useEffect, useContext}  from "react";
import styled, { css } from "styled-components";

import { ThemeContext } from "../../contexts/ThemeStore";

const genreMappings = [
  {
    pageId: 9510,
    genre: "electronic"
  },
  {
    pageId: 25423,
    genre: "rock"
  }
];

const Text = styled.p`
  color: ${(props) => props.theme.text};

  ${(props) => props.primary && css`
    color: ${(props) => props.theme.title};
    font-size: larger;
    font-weight: bolder;
  `};
`;

const WikipediaExtract = () => {
  const [extract, setExtract] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("Fetching the extract from Wikipedia");

    const getExtract = async (id) => {
      if (id > 0) {
        try {
          const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${id}&format=json&origin=*`);
          const json = await res.json();
          setExtract(json.query.pages[id].extract);
          console.log(json.query.pages[id].extract);
        } catch (error) {
          console.error(error);
        }
      }
    };
    
    // Theme to pageId
    console.log(genreMappings);
    console.log(theme);
    const elem = genreMappings.find(element => element.genre === theme);
    console.log(elem);

    if (elem) {
      getExtract(elem.pageId);
    }
  }, [theme]);

  return extract && (
    <div>
      <Text primary>{theme}</Text>
      <Text>{extract}</Text>
    </div>
  );
};

export default WikipediaExtract;