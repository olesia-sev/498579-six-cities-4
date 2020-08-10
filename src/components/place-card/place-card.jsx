import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app";
import PropTypes from 'prop-types';
import {offerType} from "../../prop-types/prop-types";
import {PLACE_CARD_THEME, Rating} from "../common/ratinig/ratinig";
import FavouriteButton, {PLACE_CARD_FAV_BTN} from "../common/favourite-button/favourite-button";
import {getFilteredOffers} from "../../reducer/data/selectors";

export const MAIN_THEME = `main`;
export const NEARBY_THEME = `nearby`;
export const FAVOURITE_THEME = `favourite`;
const themes = {
  [MAIN_THEME]: {
    article: `cities__place-card place-card`,
    imageWrapper: `cities__image-wrapper place-card__image-wrapper`,
    infoWrapper: `place-card__info`,
    imageWidth: 260,
    imageHeight: 200,
  },
  [NEARBY_THEME]: {
    article: `near-places__card place-card`,
    imageWrapper: `near-places__image-wrapper place-card__image-wrapper`,
    infoWrapper: `place-card__info`,
    imageWidth: 260,
    imageHeight: 200,
  },
  [FAVOURITE_THEME]: {
    article: `favorites__card place-card`,
    imageWrapper: `favorites__image-wrapper place-card__image-wrapper`,
    infoWrapper: `favorites__card-info place-card__info`,
    imageWidth: 150,
    imageHeight: 110,
  },
};

const PremiumMark = () => {
  return (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
};

const PlaceCardInfo = ({price, saved, rating, id, title, placeType, theme}) => {
  const currentTheme = themes[theme];

  return (
    <div className={currentTheme.infoWrapper}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>

        <FavouriteButton id={id} saved={saved} theme={PLACE_CARD_FAV_BTN} />

      </div>

      <Rating rating={rating} theme={PLACE_CARD_THEME} />

      <h2 className="place-card__name">
        <Link to={`/offers/${id}`}>{title}</Link>
      </h2>
      <p className="place-card__type">{placeType}</p>
    </div>
  );
};

const PlaceCard = ({theme, offer, setHoveredOffer}) => {
  const currentTheme = themes[theme];

  return (
    <article
      className={currentTheme.article}
      onMouseEnter={setHoveredOffer(offer)}
      onMouseLeave={setHoveredOffer(null)}
    >
      {
        offer.premium &&
        <PremiumMark />
      }

      <div className={currentTheme.imageWrapper}>
        <Link to={`/offers/${offer.id}`}>
          <img className="place-card__image"
            src={offer.img} width={currentTheme.imageWidth} height={currentTheme.imageHeight}
            alt="Place image"
          />
        </Link>
      </div>

      <PlaceCardInfo {...offer} theme={theme} />

    </article>
  );
};

PlaceCard.propTypes = {
  theme: PropTypes.oneOf([MAIN_THEME, NEARBY_THEME, FAVOURITE_THEME]).isRequired,
  offer: offerType,
  setHoveredOffer: PropTypes.func.isRequired,
};

PlaceCardInfo.propTypes = {
  price: PropTypes.number.isRequired,
  saved: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([MAIN_THEME, NEARBY_THEME, FAVOURITE_THEME]).isRequired,
};

const mapStateToProps = (state) => {
  return {
    offers: getFilteredOffers(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  setHoveredOffer: (offer) => () => dispatch(ActionCreator.getHoveredOffer(offer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
