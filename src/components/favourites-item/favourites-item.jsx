import React from 'react';
import PlaceCard from "../place-card/place-card";
import * as themes from "../place-card/place-card";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils/utils";

const FavouritesItem = ({favourites, city}) => {
  return (
    <li key={city} className="favorites__locations-items">

      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={AppRoute.ROOT} className="locations__item-link">
            <span>{city}</span>
          </Link>
        </div>
      </div>

      <div className="favorites__places">
        {
          favourites.filter((item) => item.cityId === city).map((favItem) => (
            <PlaceCard key={favItem.id} theme={themes.FAVOURITE_THEME} offer={favItem}/>
          ))
        }

      </div>
    </li>
  );
};

FavouritesItem.propTypes = {
  favourites: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
};

export {FavouritesItem};
