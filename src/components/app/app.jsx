import React from "react";
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {offersTypeArray} from '../../prop-types/prop-types';
import {Main} from '../main/main';
import {Property} from "../property/property";

const App = ({optionsAmount, offers}) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main
            optionsAmount = {optionsAmount}
            offers = {offers}
          />
        </Route>

        <Route path="/offers/:id">
          <Property offers={offers} />
        </Route>

      </Switch>
    </Router>
  );
};

App.propTypes = {
  optionsAmount: PropTypes.number.isRequired,
  offers: offersTypeArray,
};

export {App};
