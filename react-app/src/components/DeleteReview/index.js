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
			<div className="confirm">confirm delete.</div>
			<div className="delete-text">
				are you sure you want to remove this review?
			</div>
			<div className="delete-buttons-container">
				<button
					className="delete-btns-modal"
					onClick={() => handleDelete()}
				>
					yes (remove review.)
				</button>
				<button
					className="delete-btns-modal"
					onClick={() => closeModal()}
				>
					no (keep review.)
				</button>
			</div>
		</div>
	);
};

export default DeleteReviewPage;
