import React from "react";
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {offersTypeArray} from '../../prop-types/prop-types';
import {Main} from '../main/main';
import {PlaceCardDetail} from "../place-card-detail/place-card-detail";

const App = ({optionsAmount, offers}) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main
            optionsAmount = {optionsAmount}
            offers = {offers}
          />;
        </Route>

        <Route path="/offers/:id">
          <PlaceCardDetail offers={offers} />
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
