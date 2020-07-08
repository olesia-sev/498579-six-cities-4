import React from "react";
import PropTypes from "prop-types";

export const PLACE_CARD_THEME = `place-card`;
export const REVIEWS_THEME = `reviews`;
export const PROPERTY_THEME = `property`;
const themes = {
  [PLACE_CARD_THEME]: {
    rating: `place-card__rating rating`,
    ratingStars: `place-card__stars rating__stars`,
  },
  [REVIEWS_THEME]: {
    rating: `reviews__rating rating`,
    ratingStars: `reviews__stars rating__stars`,
  },
  [PROPERTY_THEME]: {
    rating: `property__rating rating`,
    ratingStars: `property__stars rating__stars`,
  }
};

const Rating = ({theme, rating}) => {
  const currentTheme = themes[theme];

  return (
    <div className={currentTheme.rating}>
      <div className={currentTheme.ratingStars}>
        <span style={{width: `${rating * 20}%`}} />
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
};

Rating.propTypes = {
  theme: PropTypes.oneOf([PLACE_CARD_THEME, REVIEWS_THEME, PROPERTY_THEME]).isRequired,
  rating: PropTypes.number.isRequired,
};

export {Rating};
