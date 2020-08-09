import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getActiveCity, getFilteredOffers} from "../../reducer/data/selectors";
import Header from '../common/header/header';
import {offersTypeArray} from '../../prop-types/prop-types';
import {MainEmpty} from '../main-empty/main-empty';
import CitiesList from '../cities-list/cities-list';
import {MainPlacesList, MAIN_THEME} from "../places-list/places-list";
import {MainMap} from "../map/map";
import Sorting from "../sorting/sorting";
import {getAuthStatus} from "../../reducer/user/selectors";

const MainContent = ({offers, currentCity}) => {

  const getTitle = () => {
    switch (true) {
      case offers.length > 1:
        return `${offers.length} places to stay in ${currentCity.name}`;
      case offers.length === 1:
        return `${offers.length} place to stay in ${currentCity.name}`;
      default: {
        return `No places to stay available`;
      }
    }
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{getTitle()}</b>

        <Sorting />

        <MainPlacesList theme={MAIN_THEME} />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <MainMap />
        </section>
      </div>
    </div>
  );
};

const Main = ({offers, currentCity}) => {

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className={
        `page__main page__main--index
        ${offers.length === 0 ? `page__main--index-empty` : ``}
        `}>
        <h1 className="visually-hidden">Cities</h1>

        <CitiesList />

        <div className="cities">
          {
            offers.length === 0 ?
              <MainEmpty /> :
              <MainContent offers={offers} currentCity={currentCity} />
          }
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: offersTypeArray,
  currentCity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  authStatus: PropTypes.string.isRequired,
};

MainContent.propTypes = {
  offers: offersTypeArray,
  currentCity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
};

const mapStateToProps = (state) => {
  return {
    offers: getFilteredOffers(state),
    currentCity: getActiveCity(state),
    authStatus: getAuthStatus(state),
  };
};

export default connect(mapStateToProps)(Main);
