import React from "react";
import PropTypes from 'prop-types';
import {Main} from '../main/main';

const titleClickHandler = () => {};

const App = (props) => {
  const {optionsAmount, cardTitles} = props;

  return <Main
    optionsAmount = {optionsAmount}
    cardTitles = {cardTitles}
    onCardTitleClick = {titleClickHandler}
  />;
};

App.propTypes = {
  optionsAmount: PropTypes.number.isRequired,
  cardTitles: PropTypes.arrayOf(
      PropTypes.string
  ).isRequired,
};

export {App};
