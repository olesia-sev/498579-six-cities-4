import React from 'react';
import {reviewType} from '../../prop-types/prop-types';
import {Rating, REVIEWS_THEME} from "../common/ratinig/ratinig";

const Review = ({review}) => {
  const {id, userName, userAvatar, rating, content, date} = review;
  return (
    <li key={id} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={userAvatar} width="54" height="54"
            alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">

        <Rating rating={rating} theme={REVIEWS_THEME} />

        <p className="reviews__text">
          {content}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{date}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: reviewType,
};

const MemoizedReview = React.memo(Review);

export {MemoizedReview as Review};
