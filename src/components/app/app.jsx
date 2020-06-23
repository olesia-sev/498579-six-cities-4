import React from "react";
import PropTypes from 'prop-types';
import {offersTypeArray} from '../../prop-types/prop-types';
import {Main} from '../main/main';

const App = ({optionsAmount, offers}) => {
  return <Main
    optionsAmount = {optionsAmount}
    offers = {offers}
  />;
};

App.propTypes = {
  optionsAmount: PropTypes.number.isRequired,
  offers: offersTypeArray,
};

export {App};
