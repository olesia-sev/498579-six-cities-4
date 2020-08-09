import React, {useEffect, useState} from 'react';
import Header from "../common/header/header";
import {Footer} from "../common/footer/footer";
import {connect} from "react-redux";
import {getFavourites, getFavouritesLocations} from "../../reducer/data/selectors";
import {Operation as DataOperation} from "../../reducer/data/data";
import PropTypes from "prop-types";
import {FavouritesItem} from "../favourites-item/favourites-item";
import {FavouritesEmpty} from "../favourites-empty/favourites-empty";
import {isUserAuthorizedSelector} from "../../reducer/user/selectors";

const FavouritesContent = ({favouritesLocations, favourites}) => {
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {
            favouritesLocations.map((city) => (
              <FavouritesItem key={city} city={city} favourites={favourites} />
            ))
          }
        </ul>
      </section>
    </div>
  );
};

const Favourites = ({isUserAuthorized, favourites, favouritesLocations, loadFavourites}) => {
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isUserAuthorized) {
      loadFavourites().then(() => {
        // console.log('OLOLO');
        setIsLoaded(true);
      });
    }
  }, [isUserAuthorized]);

  if (!loaded) {
    return null;
  }

  return (
    <div className={
      `page
      ${favourites.length === 0 ? `page--favorites-empty` : ``}
      `}>
      <Header />
      <main className={
        `page__main page__main--favorites
         ${favourites.length === 0 ? `page__main--favorites-empty` : ``}
        `}>

        {
          favourites.length === 0 ?
            <FavouritesEmpty /> :
            <FavouritesContent favouritesLocations={favouritesLocations} favourites={favourites} />
        }

      </main>
      <Footer />
    </div>
  );
};

FavouritesContent.propTypes = {
  favourites: PropTypes.array.isRequired,
  favouritesLocations: PropTypes.array.isRequired,
};

Favourites.propTypes = {
  isUserAuthorized: PropTypes.bool.isRequired,
  favourites: PropTypes.array.isRequired,
  favouritesLocations: PropTypes.array.isRequired,
  loadFavourites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isUserAuthorized: isUserAuthorizedSelector(state),
    favourites: getFavourites(state),
    favouritesLocations: getFavouritesLocations(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFavourites: () => dispatch(DataOperation.loadFavourites()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
