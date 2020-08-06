import React from 'react';
import {reviewTypeArray} from '../../prop-types/prop-types';
import {Review} from '../review/review';

const ReviewsList = ({reviews}) => {
  return (
    <ul className="reviews__list">
      {
        reviews.map((review) => (
          <Review
            key={review.id}
            review={review}
          />
        ))
      }
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: reviewTypeArray,
};

export {ReviewsList};
