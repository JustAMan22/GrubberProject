import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import "./CreateReview.css";

function CreateReviewPage() {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const history = useHistory();
  const [review_text, setReview] = useState("");
  const [stars, setStars] = useState();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (review_text.length < 10)
      errors.review = "Review text must be greater than 10 characters!";
    if (review_text.length > 250)
      errors.review = "Review text must be 250 characters or less!";
    if (!stars) errors.stars = "A star rating is required!";
    if (stars > 5 || stars < 1)
      errors.stars = "Star rating must be between 1 and 5! ";
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      setSubmitted(true);
      const reviewInfo = {
        review_text,
        stars,
      };

      try {
        const createdReview = await dispatch(
          createReview(restaurantId, reviewInfo)
        );
        if (createdReview) {
          history.push(`/restaurants/${restaurantId}`);
        }
      } catch (error) {
        console.error("Error creating review:", error);
        if (error instanceof Response) {
          const responseJson = await error.json();
          console.error("Server response:", responseJson);
        }
      }
    }
  };

  return (
    <div className="create-review-container">
      <h2 className="create-review-title">tell us your experience.</h2>
      <form onSubmit={handleSubmit}>
        <div className="review-content-main">
          <div className="form-row-stars-rating-container">
            <div className="stars-container">
              <div className="rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= stars ? "filled" : ""}`}
                      onClick={() => setStars(star)}
                    >
                      ⋆
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <label className="create-review-label">
              <textarea
                type="text"
                value={review_text}
                placeholder="Type review here..."
                onChange={(e) => setReview(e.target.value)}
                className="create-review-input"
              />
            </label>
          </div>
          <div className="all-errors-reviews">
            {errors.review && (
              <div className="create-review-error-div">
                <span className="create-review-error-text">
                  ⚠︎ {errors.review}
                </span>
              </div>
            )}
            {errors.stars && (
              <div className="create-review-error-div">
                <span className="create-stars-error-text">
                  ⚠︎ {errors.stars}
                </span>
              </div>
            )}
          </div>
          <br />
          <button
            type="submit"
            className="create-review-submit-button"
            disabled={submitted}
          >
            Post Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateReviewPage;
