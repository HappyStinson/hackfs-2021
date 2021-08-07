import React, { Component } from "react";

import AudiusHttpAPI from "./audius/HttpApi/HttpApi";
import TodoContainer from "./components/TodoContainer";

// Stylesheets
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Ras Crypto Adventure!</h1>
        <TodoContainer />

        <h1>Audius API Example</h1>
        <AudiusHttpAPI />
      </div>
    );
  }
}

export default App;
