import React, { Component } from "react";
// import { Route, Switch } from "react-router-dom";

// import Navbar from "./functionBased/components/Navbar";
import ContentContainer from "./functionBased/components/ContentContainer";
import Title from "./functionBased/components/Title";
import TopBar from "./functionBased/components/TopBar";
import Theme from "./Theme";
import { ThemeStore } from "./contexts/ThemeStore";

// import About from "./functionBased/pages/About";
// import NotMatch from "./functionBased/pages/NotMatch";
import AudiusHost from "./functionBased/components/AudiusHost";

// import "./functionBased/App.css";

class App extends Component {

  render() {
    return (
      <ThemeStore>
      <Theme>
        <TopBar />
        <ContentContainer>
          <Title>Chill with Audius API</Title>
          <AudiusHost />
        </ContentContainer>
      </Theme>
    </ThemeStore>
    );

    /* return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <ThemeStore>
              <Theme>
                <TopBar />
                <ContentContainer>
                  <Title>Chill with Audius API</Title>
                  <AudiusAPI />
                </ContentContainer>
              </Theme>
            </ThemeStore>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="*">
            <NotMatch />
          </Route>
        </Switch>
      </>
    ); */
  };
}

export default App;