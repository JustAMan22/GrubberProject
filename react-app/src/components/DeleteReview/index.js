import React from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { getRestaurantDetail } from "../../store/restaurants";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const DeleteReviewPage = ({ reviewId, restaurantId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const handleDelete = () => {
    const deletedReview = dispatch(deleteReview(reviewId));
    if (deletedReview) {
      closeModal();
      dispatch(getRestaurantDetail(restaurantId));
      history.push(`/restaurants/${restaurantId}`);
    }
  };

  return (
    <div className="delete-container">
      <h2 className="borp">Confirm Delete</h2>
      <p className="delete-text">
        Are you sure you want to remove this review?
      </p>
      <div className="button57-container">
        <button className="yes-button1" onClick={() => handleDelete()}>
          YES (Delete Review)
        </button>
        <button className="no-button1" onClick={() => closeModal()}>
          NO (Keep Review)
        </button>
      </div>
    </div>
  );
};

export default DeleteReviewPage;
