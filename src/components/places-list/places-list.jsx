import React from 'react';
import {offersTypeArray} from '../../prop-types/prop-types';
import {PlaceCard} from "../place-card/place-card";
import PropTypes from "prop-types";
import {connect} from "react-redux";

export const MAIN_THEME = `main`;
export const NEARBY_THEME = `nearby`;
const themes = {
  [MAIN_THEME]: {
    placesList: `cities__places-list places__list tabs__content`,
  },
  [NEARBY_THEME]: {
    placesList: `near-places__list places__list`,
  },
};

const PlacesList = ({theme, offers}) => {

  const currentTheme = themes[theme];

  return (
    <div className={currentTheme.placesList}>
      {
        offers.map((offer) => (
          <PlaceCard key={offer.id} theme={theme} offer={offer} />
        ))
      }
    </div>
  );
};

PlacesList.propTypes = {
  theme: PropTypes.oneOf([MAIN_THEME, NEARBY_THEME]).isRequired,
  offers: offersTypeArray,
};

const mapStateToProps = (state) => {
  const currentCityOffers = state.offers.filter((offer) => offer.cityId === state.activeCityId);
  return {
    offers: currentCityOffers,
  };
};

export default connect(mapStateToProps)(PlacesList);
