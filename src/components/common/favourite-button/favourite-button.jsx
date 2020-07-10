import React from "react";
import PropTypes from "prop-types";

export const PLACE_CARD_FAV_BTN = `place-card`;
export const PROPERTY_FAV_BTN = `property`;
const themes = {
  [PLACE_CARD_FAV_BTN]: {
    button: `place-card__bookmark-button button`,
    buttonActive: `place-card__bookmark-button--active`,
    buttonSvg: `place-card__bookmark-icon`,
  },
  [PROPERTY_FAV_BTN]: {
    button: `property__bookmark-button button`,
    buttonActive: `property__bookmark-button--active`,
    buttonSvg: `property__bookmark-icon place-card__bookmark-icon`,
  },
};

const FavouriteButton = ({theme, saved}) => {
  const currentTheme = themes[theme];

  return (
    <button
      className={`${currentTheme.button} ${saved ? currentTheme.buttonActive : ``}`}
      type="button"
    >
      <svg className={currentTheme.buttonSvg} width="18" height="19">
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

FavouriteButton.propTypes = {
  theme: PropTypes.oneOf([PLACE_CARD_FAV_BTN, PROPERTY_FAV_BTN]).isRequired,
  saved: PropTypes.bool.isRequired,
};

export {FavouriteButton};
