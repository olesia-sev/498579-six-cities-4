import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {offerType, reviewTypeArray} from '../../prop-types/prop-types';
import {getCurrentOffer} from '../../reducer/data/selectors';
import {PROPERTY_THEME, Rating} from '../common/ratinig/ratinig';
import {FavouriteButton, PROPERTY_FAV_BTN} from '../common/favourite-button/favourite-button';
import PlacesList, {NEARBY_THEME} from '../places-list/places-list';
import Map from '../map/map';
import {Header} from '../common/header/header';
import {ReviewsList} from '../reviews-list/reviews-list';

const PropertyGallery = ({images, title}) => {
  return (
    <div className="property__gallery">
      {images.map((image, i) => (
        <div key={`${i}-${image}`} className="property__image-wrapper">
          <img className="property__image" src={image} alt={title} />
        </div>
      ))}
    </div>
  );
};

const PropertyHeader = ({premium, title, saved}) => {
  return (
    <React.Fragment>
      {premium ?
        <div className="property__mark">
          <span>Premium</span>
        </div> : ``}
      <div className="property__name-wrapper">
        <h1 className="property__name">{title}</h1>

        <FavouriteButton saved={saved} theme={PROPERTY_FAV_BTN} />

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

const PropertyReviewForm = () => {
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label"
          title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label"
          title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label"
          title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
};

const PropertyReview = ({reviews}) => {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

      <ReviewsList reviews={reviews} />

      <PropertyReviewForm />

    </section>
  );
};

const PropertyMap = () => {
  return (
    <section className="property__map map">
      <Map />
    </section>
  );
};


const Property = ({currentOffer}) => {
  if (!currentOffer) {
    return null;
  }

  const {
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
    reviews,
  } = currentOffer;

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

                <PropertyHeader premium={premium} title={title} saved={saved} />

                <Rating rating={rating} theme={PROPERTY_THEME} />

                <PropertyFeatures placeType={placeType} numberOfBedrooms={numberOfBedrooms} maxGuests={maxGuests}/>

                <PropertyPrice price={price} />

                <PropertyInside featuresInside={featuresInside} />

                <PropertyHost userPro={userPro} hostAvatar={hostAvatar} hostName={hostName} description={description} />

                <PropertyReview reviews={reviews} />

              </div>
            </div>

            <PropertyMap />

          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <PlacesList theme={NEARBY_THEME} />

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

PropertyReview.propTypes = {
  reviews: reviewTypeArray,
};

Property.propTypes = {
  currentOffer: offerType,
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentOffer: getCurrentOffer(state, ownProps.match.params.id),
  };
};

export default withRouter(connect(mapStateToProps)(Property));
