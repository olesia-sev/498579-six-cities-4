import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ReviewsList} from "../reviews-list/reviews-list";
import PropertyReviewForm from "../property-review-form/property-review-form";
import {getReviews} from "../../reducer/data/selectors";
import {Operation as DataOperation} from "../../reducer/data/data";
import {withRouter} from "react-router-dom";
import {reviewTypeArray} from "../../prop-types/prop-types";

const PropertyReviewSection = ({reviews, authStatus, loadReviews}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReviews().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

      <ReviewsList reviews={reviews} />

      {authStatus === `AUTH` ? <PropertyReviewForm /> : null}

    </section>
  );
};

PropertyReviewSection.propTypes = {
  authStatus: PropTypes.string.isRequired,
  reviews: reviewTypeArray,
  loadReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    reviews: getReviews(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadReviews: () => dispatch(DataOperation.loadReviews(ownProps.match.params.id))
  };
};

const ConnectedPropertyReviewSection = withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyReviewSection));

export {ConnectedPropertyReviewSection as PropertyReviewSection};
