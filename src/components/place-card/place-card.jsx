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
const themes = {
  [MAIN_THEME]: {
    article: `cities__place-card place-card`,
    imageWrapper: `cities__image-wrapper place-card__image-wrapper`,
  },
  [NEARBY_THEME]: {
    article: `near-places__card place-card`,
    imageWrapper: `near-places__image-wrapper place-card__image-wrapper`,
  },
};

const PremiumMark = () => {
  return (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
};

const PlaceCardInfo = ({price, saved, rating, id, title, placeType}) => {
  return (
    <React.Fragment>
      <div className="place-card__info">
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
    </React.Fragment>
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
        <a href="#">
          <img className="place-card__image"
            src={offer.img} width="260" height="200"
            alt="Place image"
          />
        </a>
      </div>

      <PlaceCardInfo {...offer} />

    </article>
  );
};

PlaceCard.propTypes = {
  theme: PropTypes.oneOf([MAIN_THEME, NEARBY_THEME]).isRequired,
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
