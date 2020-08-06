import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {offersTypeArray} from '../../prop-types/prop-types';
import {getSortedOffers} from '../../utils/utils';
import {getFilteredOffers} from '../../reducer/data/selectors';
import {getActiveSortingType} from '../../reducer/app/selectors';
import PlaceCard from '../place-card/place-card';

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
          <PlaceCard key={offer.id} theme={theme} offer={offer}/>
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
  const currentCityOffers = getSortedOffers(getFilteredOffers(state), getActiveSortingType(state));
  return {
    offers: currentCityOffers,
  };
};

export default connect(mapStateToProps)(PlacesList);
