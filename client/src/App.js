import React, { Component } from "react";

import AudiusHttpAPI from "./audius/HttpApi/HttpApi";
import TodoContainer from "./functionBased/components/TodoContainer";

// Stylesheets
import "./functionBased/App.css";

class App extends Component {

  render() {
    return (
      <div>
        <h1>Ras Crypto Adventure!</h1>
        <TodoContainer />

        <h1>Audius API Example</h1>
        <AudiusHttpAPI />
      </div>
    );
  };
}

export default App;
