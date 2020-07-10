import React from "react";
import PropTypes from 'prop-types';
import {offersTypeArray} from '../../prop-types/prop-types';
import {Header} from '../common/header/header';
import {PlacesList, MAIN_THEME} from "../places-list/places-list";
import {Map} from "../map/map";

const MainTabs = () => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          <li className="locations__item">
            <a className="locations__item-link tabs__item" href="#">
              <span>Paris</span>
            </a>
          </li>
          <li className="locations__item">
            <a className="locations__item-link tabs__item" href="#">
              <span>Cologne</span>
            </a>
          </li>
          <li className="locations__item">
            <a className="locations__item-link tabs__item" href="#">
              <span>Brussels</span>
            </a>
          </li>
          <li className="locations__item">
            <a className="locations__item-link tabs__item tabs__item--active">
              <span>Amsterdam</span>
            </a>
          </li>
          <li className="locations__item">
            <a className="locations__item-link tabs__item" href="#">
              <span>Hamburg</span>
            </a>
          </li>
          <li className="locations__item">
            <a className="locations__item-link tabs__item" href="#">
              <span>Dusseldorf</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

const MainSort = () => {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0">
                  Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
    </form>
  );
};

const Main = ({optionsAmount, offers}) => {
  return (
    <React.Fragment>
      <div className="page page--gray page--main">

        <Header />

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>

          <MainTabs />

          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{optionsAmount} places to stay in Amsterdam</b>

                <MainSort />

                <PlacesList offers = {offers} theme={MAIN_THEME} />

              </section>

              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers = {offers}/>
                </section>
              </div>

            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  optionsAmount: PropTypes.number.isRequired,
  offers: offersTypeArray,
};

export {Main};
