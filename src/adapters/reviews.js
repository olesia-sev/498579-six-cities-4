const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export const mapReviews = (review) => {
  const dateObject = new Date(review.date);

  return {
    id: review.id,
    userName: review.user.name,
    userAvatar: review.user.avatar_url,
    rating: review.rating,
    content: review.comment,
    date: `${months[dateObject.getUTCMonth() - 1]} ${dateObject.getUTCFullYear()}`,
  };
};
