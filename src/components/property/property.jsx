import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {offerType} from '../../prop-types/prop-types';
import {getCurrentOffer} from '../../reducer/data/selectors';
import {PROPERTY_THEME, Rating} from '../common/ratinig/ratinig';
import FavouriteButton, {PROPERTY_FAV_BTN} from '../common/favourite-button/favourite-button';
import {NearbyPlacesList, NEARBY_THEME} from '../places-list/places-list';
import {PropertyNearbyMap} from '../map/map';
import Header from '../common/header/header';
import {getAuthStatus} from "../../reducer/user/selectors";
import {Operation as DataOperation} from "../../reducer/data/data";
import {PropertyReviewSection} from '../property-review-section/property-review-section';

const PropertyGallery = ({images, title}) => {
  return (
    <div className="property__gallery">
      {images.slice(0, 6).map((image, i) => (
        <div key={`${i}-${image}`} className="property__image-wrapper">
          <img className="property__image" src={image} alt={title} />
        </div>
      ))}
    </div>
  );
};

const PropertyHeader = ({id, premium, title, saved}) => {
  return (
    <React.Fragment>
      {premium ?
        <div className="property__mark">
          <span>Premium</span>
        </div> : ``}
      <div className="property__name-wrapper">
        <h1 className="property__name">{title}</h1>

        <FavouriteButton id={id} saved={saved} theme={PROPERTY_FAV_BTN} />

      </div>
    </React.Fragment>
  );
};

const PropertyPrice = ({price}) => {
  return (
    <div className="property__price">
      <b className="property__price-value">&euro;{price}</b>
      <span className="property__price-text">&nbsp;night</span>
    </div>
  );
};

const PropertyFeatures = ({placeType, numberOfBedrooms, maxGuests}) => {
  return (
    <ul className="property__features">
      <li className="property__feature property__feature--entire">
        {placeType}
      </li>
      <li className="property__feature property__feature--bedrooms">
        {numberOfBedrooms} Bedrooms
      </li>
      <li className="property__feature property__feature--adults">
        Max {maxGuests} adults
      </li>
    </ul>
  );
};

const PropertyInside = ({featuresInside}) => {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {featuresInside.map((feature, i) => (
          <li key={`${i}-${feature}`} className="property__inside-item">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PropertyHost = ({userPro, hostAvatar, hostName, description}) => {
  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={`property__avatar-wrapper
                    ${userPro ? `property__avatar-wrapper--pro` : ``}
                     user__avatar-wrapper`
        }>
          <img
            className="property__avatar user__avatar"
            src={hostAvatar}
            width="74"
            height="74"
            alt="Host avatar"
          />
        </div>
        <span className="property__user-name">{hostName}</span>
      </div>
      <div className="property__description">
        <p className="property__text">
          {description}
        </p>
      </div>
    </div>
  );
};

const PropertyMap = () => {
  return (
    <section className="property__map map">
      <PropertyNearbyMap />
    </section>
  );
};


const Property = ({currentOffer, authStatus, getOffersNearby}) => {
  if (!currentOffer) {
    return null;
  }

  const {
    id,
    images,
    price,
    title,
    placeType,
    numberOfBedrooms,
    maxGuests,
    rating,
    saved,
    premium,
    featuresInside,
    hostName,
    hostAvatar,
    userPro,
    description,
  } = currentOffer;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOffersNearby().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="page">

        <Header />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">

              <PropertyGallery images={images} title={title} />

            </div>
            <div className="property__container container">
              <div className="property__wrapper">

                <PropertyHeader id={id} premium={premium} title={title} saved={saved} />

                <Rating rating={rating} theme={PROPERTY_THEME} />

                <PropertyFeatures placeType={placeType} numberOfBedrooms={numberOfBedrooms} maxGuests={maxGuests}/>

                <PropertyPrice price={price} />

                <PropertyInside featuresInside={featuresInside} />

                <PropertyHost userPro={userPro} hostAvatar={hostAvatar} hostName={hostName} description={description} />

                <PropertyReviewSection authStatus={authStatus} />

              </div>
            </div>

            <PropertyMap />

          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <NearbyPlacesList theme={NEARBY_THEME} />

            </section>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

PropertyGallery.propTypes = {
  images: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

PropertyHeader.propTypes = {
  id: PropTypes.number.isRequired,
  premium: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  saved: PropTypes.bool.isRequired,
};

PropertyPrice.propTypes = {
  price: PropTypes.number.isRequired,
};

PropertyInside.propTypes = {
  featuresInside: PropTypes.array.isRequired
};

PropertyFeatures.propTypes = {
  placeType: PropTypes.string.isRequired,
  numberOfBedrooms: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
};

PropertyHost.propTypes = {
  userPro: PropTypes.bool.isRequired,
  hostAvatar: PropTypes.string.isRequired,
  hostName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

Property.propTypes = {
  currentOffer: offerType,
  authStatus: PropTypes.string.isRequired,
  getOffersNearby: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentOffer: getCurrentOffer(state, ownProps.match.params.id),
    authStatus: getAuthStatus(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getOffersNearby: () => dispatch(DataOperation.getOffersNearby(ownProps.match.params.id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Property));
