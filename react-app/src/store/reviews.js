const CREATE_REVIEW = "CREATE_REVIEW";
const GET_RESTAURANT_REVIEWS = "GET_RESTAURANT_REVIEWS";
const UPDATE_REVIEW = "UPDATE_REVIEW";
const DELETE_REVIEW = "Reviews/DELETE_REVIEW";

const createReviewAction = (review) => ({
  type: CREATE_REVIEW,
  review,
});

const getRestaurantReviewsAction = (reviews) => ({
  type: GET_RESTAURANT_REVIEWS,
  reviews,
});

const updateReviewAction = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

const deleteReviewAction = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const getRestaurantReviews = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/reviews`);
  if (res.ok) {
    const reviews = await res.json();
    dispatch(getRestaurantReviewsAction(reviews));
    return res;
  }
};

export const createReview = (restaurantId, reviewData) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/reviews/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });

  if (res.ok) {
    const reviewData = await res.json();
    dispatch(createReviewAction(reviewData));
    return reviewData;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const updateReview =
  (restaurantId, reviewId, reviewData) => async (dispatch) => {
    const res = fetch(`/api/restaurants/${restaurantId}/review/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      const updatedReview = await res.json();
      dispatch(updateReviewAction(updatedReview));
      return updatedReview;
    }
  };

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = fetch(`/api/reviews/${reviewId}/delete`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return "Review couldn't be removed";
  }
  dispatch(deleteReviewAction(reviewId));
};

const reviewReducer = (state = {}, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_RESTAURANT_REVIEWS:
      newState = {};
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case CREATE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case UPDATE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
