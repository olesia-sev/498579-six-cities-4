import React from 'react';
import PropTypes from 'prop-types';
import {offersTypeArray} from '../../prop-types/prop-types';
import {PlaceCard} from '../place-card/place-card';

const PlacesList = ({setActiveOffer, offers}) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard key={offer.id}
            offer={offer}
            setActiveOffer={setActiveOffer}
          />
        ))
      }
    </div>
  );
};

PlacesList.propTypes = {
  setActiveOffer: PropTypes.func.isRequired,
  offers: offersTypeArray,
};

const MemoizedPlacesList = React.memo(PlacesList);

export {MemoizedPlacesList as PlacesList};
