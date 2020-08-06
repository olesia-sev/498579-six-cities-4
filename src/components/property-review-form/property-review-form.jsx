import React, {useCallback, useRef, useState} from "react";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

const DisabledVariant = {
  LOADING: `LOADING`,
  NOT_FILLED: `NOT_FILLED`,
};

const PropertyReviewForm = ({postReview, loadReviews}) => {
  const [disabledVariant, setDisabledVariant] = useState(DisabledVariant.NOT_FILLED);

  /** @type Object */
  const formRef = useRef(null);

  /** @type Object */
  const ratingRef = useRef(0);

  /** @type Object */
  const commentRef = useRef(``);

  const onFormChangeHandler = useCallback((evt) => {
    if (evt.target.name === `rating`) {
      ratingRef.current = +evt.target.value || 0;
    }

    if (evt.target.name === `review`) {
      commentRef.current = evt.target.value.trim();
    }

    if (ratingRef.current > 0 && commentRef.current.length >= 50 && commentRef.current.length <= 300) {
      setDisabledVariant(undefined);
    } else {
      setDisabledVariant(DisabledVariant.NOT_FILLED);
    }
  }, []);

  const onFormSubmitHandler = useCallback((evt) => {
    evt.preventDefault();

    if (!disabledVariant) {
      setDisabledVariant(DisabledVariant.LOADING);

      postReview({
        comment: commentRef.current,
        rating: ratingRef.current
      })
        .then(() => {
          loadReviews();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          // eslint-disable-next-line no-alert
          alert(`Произошла ошибка, попробуйте ещё раз`);
        })
        .finally(() => {
          if (formRef.current) {
            formRef.current.reset();
          }
        });
    }
  }, [disabledVariant, postReview]);

  const onFormResetHandler = useCallback(() => {
    setDisabledVariant(DisabledVariant.NOT_FILLED);
    ratingRef.current = 0;
    commentRef.current = ``;
  }, []);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onFormSubmitHandler}
      onChange={onFormChangeHandler}
      onReset={onFormResetHandler}
      ref={formRef}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          disabled={disabledVariant === DisabledVariant.LOADING}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          disabled={disabledVariant === DisabledVariant.LOADING}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          disabled={disabledVariant === DisabledVariant.LOADING}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label"
          title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          disabled={disabledVariant === DisabledVariant.LOADING}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label"
          title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          disabled={disabledVariant === DisabledVariant.LOADING}
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
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={disabledVariant === DisabledVariant.LOADING}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!!disabledVariant}
        >Submit</button>
      </div>
    </form>
  );
};

PropertyReviewForm.propTypes = {
  postReview: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  postReview: (review) => dispatch(DataOperation.postReview(ownProps.match.params.id, review)),
  loadReviews: () => dispatch(DataOperation.loadReviews(ownProps.match.params.id)),
});

export default withRouter(connect(null, mapDispatchToProps)(PropertyReviewForm));
