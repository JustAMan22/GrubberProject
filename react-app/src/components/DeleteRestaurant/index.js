import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteRestaurant, getRestaurantDetail } from "../../store/restaurants";
import "./DeleteRestaurant.css";
import { useModal } from "../../context/Modal";

const DeleteRestaurantModal = ({ restaurantId }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();

	const handleDelete = () => {
		const deletedRestaurant = dispatch(deleteRestaurant(restaurantId));
		if (deletedRestaurant) {
			dispatch(getRestaurantDetail(restaurantId));
			closeModal();
			history.push("/");
		}
	};

	return (
		<div className="delete-container">
			<div className="confirm">confirm delete.</div>
			<div className="delete-text">
				are you sure you want to remove this restaurant?
			</div>
			<div className="delete-buttons-container">
				<button
					className="delete-btns-modal"
					onClick={() => handleDelete()}
				>
					yes (remove restaurant.)
				</button>
				<button
					className="delete-btns-modal"
					onClick={() => closeModal()}
				>
					no (keep restaurant.)
				</button>
			</div>
		</div>
	);
};

export default DeleteRestaurantModal;
