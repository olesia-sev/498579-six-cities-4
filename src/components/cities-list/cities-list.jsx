import React from "react";
import PropTypes from 'prop-types';
import {citiesTypeArray} from "../../prop-types/prop-types";
import {ActionCreator} from '../../reducer';
import {connect} from "react-redux";

const CityItem = React.memo(function CityItem({name, setCurrentCityAsActive, isActive}) {
  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`}
        href="#"
        onClick={setCurrentCityAsActive}
      >
        <span>{name}</span>
      </a>
    </li>
  );
});

const CitiesList = ({cities, setCurrentCityAsActive, activeCityId}) => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) => (
              <CityItem
                key={city.id}
                name={city.name}
                setCurrentCityAsActive={setCurrentCityAsActive(city.id)}
                isActive={city.id === activeCityId}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
};

CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  setCurrentCityAsActive: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
};

CitiesList.propTypes = {
  cities: citiesTypeArray,
  setCurrentCityAsActive: PropTypes.func.isRequired,
  activeCityId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    activeCityId: state.activeCityId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentCityAsActive: (id) => () => dispatch(ActionCreator.setActiveCity(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
