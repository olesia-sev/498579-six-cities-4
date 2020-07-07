import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {offerType} from "../../prop-types/prop-types";

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
const PlaceCard = ({theme, offer}) => {
  const currentTheme = themes[theme];
  return (
    <article
      className={currentTheme.article}
    >
      {offer.premium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={currentTheme.imageWrapper}>
        <a href="#">
          <img className="place-card__image"
            src={offer.img} width="260" height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.saved && `place-card__bookmark-button--active`}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating * 20}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offers/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.placeType}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  theme: PropTypes.oneOf([MAIN_THEME, NEARBY_THEME]).isRequired,
  offer: offerType
};

const MemoizedPlaceCard = React.memo(PlaceCard);

export {MemoizedPlaceCard as PlaceCard};
