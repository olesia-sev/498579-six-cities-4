import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from '../main/main';
import Property from "../property/property";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>

        <Route path="/offers/:id">
          <Property />
        </Route>

      </Switch>
    </Router>
  );
};

export {App};
