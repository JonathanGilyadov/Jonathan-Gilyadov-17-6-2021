import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "animate.css/animate.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Forecasts from "./components/Forecasts";
import Favorites from "./components/Favorites";
import "./App.css";

const App = () => {
  return (
    <div className="w-100 app">
      <BrowserRouter>
        <Header />
        <div className="container pt-3">
          <Switch>
            <Route exact path="/">
              <Redirect to="/forecasts/215854/Tel Aviv" />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/forecasts">
              <Forecasts />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
