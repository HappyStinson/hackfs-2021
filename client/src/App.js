import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AudiusHttpAPI from "./functionBased/components/AudiusApi";
import Navbar from "./functionBased/components/Navbar";
import Header from "./functionBased/components/Header";

import About from "./functionBased/pages/About";
import NotMatch from "./functionBased/pages/NotMatch";

import "./functionBased/App.css";

class App extends Component {

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <div className="container">
              <div className="inner">
                <Header />
                <AudiusHttpAPI />
              </div>
            </div>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="*">
            <NotMatch />
          </Route>
        </Switch>
      </>
    );
  };
}

export default App;