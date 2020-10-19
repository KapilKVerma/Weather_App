import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Navigation from "./components/Navigation";
import Weather from "./components/Weather";
import News from "./components/News";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Weather} />
          <Route path="/news" exact component={News} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
