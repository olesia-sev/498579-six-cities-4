import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import PropTypes from "prop-types";

const SORTING_TYPES = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

const Sorting = ({setSortingType, toggleSortingList, currentSortType, isOpened}) => {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={toggleSortingList(isOpened)}
      >{currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isOpened ? `places__options--opened` : ``}`}>
        {
          SORTING_TYPES.map((type, i) => (
            <li
              key={`${i}-${type}`}
              className={`places__option ${currentSortType === type ? `places__option--active` : ``}`}
              tabIndex="0"
              onClick={setSortingType(type)}
            >{type}</li>
          ))
        }
      </ul>

    </form>
  );
};

Sorting.propTypes = {
  setSortingType: PropTypes.func.isRequired,
  toggleSortingList: PropTypes.func.isRequired,
  currentSortType: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentSortType: state.activeSortingType,
    isOpened: state.isSortingListOpened,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setSortingType: (sortType) => () => dispatch(ActionCreator.sortOffers(sortType)),
  toggleSortingList: (isOpened) => () => dispatch(ActionCreator.toggleSorting(isOpened)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
