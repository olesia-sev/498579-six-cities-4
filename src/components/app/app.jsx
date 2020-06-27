import React, {useState} from "react";
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {offersTypeArray} from '../../prop-types/prop-types';
import {Main} from '../main/main';
import {PlaceCardDetail} from "../place-card-detail/place-card-detail";

const App = ({optionsAmount, offers}) => {
  const [activeOffer, setActiveOffer] = useState(null);

  if (activeOffer) {
    return <PlaceCardDetail offer={activeOffer} />;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main
            optionsAmount = {optionsAmount}
            offers = {offers}
            setActiveOffer={setActiveOffer}
          />;
        </Route>

        <Route exact path="/offer">
          <PlaceCardDetail offer={offers[0]} />
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
