import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {Operation as DataOperation} from "../../../reducer/data/data";
import {connect} from "react-redux";

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

const FavouriteButton = ({theme, saved, postFavourite}) => {
  const currentTheme = themes[theme];

  const handleFavouriteButtonClick = useCallback((evt) => {
    evt.preventDefault();
    postFavourite(+!saved);
  }, [postFavourite, saved]);

  return (
    <button
      className={`${currentTheme.button} ${saved ? currentTheme.buttonActive : ``}`}
      type="button"
      onClick={handleFavouriteButtonClick}
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
  id: PropTypes.number.isRequired,
  saved: PropTypes.bool.isRequired,
  postFavourite: PropTypes.func,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  postFavourite: (status) => {
    dispatch(DataOperation.postFavourite(ownProps.id, status));
  },
});

export default connect(null, mapDispatchToProps)(FavouriteButton);

