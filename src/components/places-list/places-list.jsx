import React, {useState} from 'react';
import {offersTypeArray} from '../../prop-types/prop-types';
import {PlaceCard} from '../place-card/place-card';

const PlacesList = ({offers}) => {
  const [, setActiveOffer] = useState(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} setActiveOffer={setActiveOffer} />
        ))
      }
    </div>
  );
};

PlacesList.propTypes = {
  offers: offersTypeArray,
};

const MemoizedPlacesList = React.memo(PlacesList);

export {MemoizedPlacesList as PlacesList};
