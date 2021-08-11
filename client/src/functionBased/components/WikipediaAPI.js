import React, { useState, useEffect}  from "react";

const genreMappings = [
  {
    pageId: 9510,
    genre: "Electronic"
  },
  {
    pageId: 25423,
    genre: "Rock"
  }
];

const WikipediaAPI = () => {
  const [pageId, setPageId] = useState(genreMappings[0].pageId);
  const [genre, setGenre] = useState(genreMappings[0].genre);
  const [extract, setExtract] = useState("We don't have any information about this genre.");

  useEffect(() => {
    const getExtract = async () => {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${pageId}&format=json&origin=*`);
      const json = await res.json();
      setExtract(json.query.pages[pageId].extract);
    };
    getExtract();
  });

  const getId = genre => {
    const elem = genreMappings.find(element => element.genre === genre);

    if (elem) {
      return elem.pageId;
    } else {
      return 0;
    }
  };

  const handleChange = e => {
    setGenre(e.target.value);
    getExtract(e.target.value);
  };

  const getExtract = async (genre) => {    
    const id = getId(genre);
    setPageId(id);
    
    if (id > 0) {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${id}&format=json&origin=*`);
      const json = await res.json();
      setExtract(json.query.pages[id].extract);
    }
  };

  return (
    <div>
      <h3>{genre}</h3>
      {extract}
      <form>
        <label htmlFor="electronic">
          <input id="electronic" type="radio" name="genres" value="Electronic" onChange={handleChange}  defaultChecked /> Electronic
        </label>
        <label htmlFor="rock">
          <input id="rock" type="radio" name="genres" value="Rock" onChange={handleChange} /> Rock
        </label>
      </form>
    </div>
  );
};

export default WikipediaAPI