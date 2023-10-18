import React from "react";
import { useDispatch } from "react-redux";
import { getRestaurantDetail } from "../../store/restaurants";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteMenuItem, getMenuItems } from "../../store/menuitems";

const DeleteMenuItemPage = ({ menuItemId, restaurantId }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();

	const handleDelete = async () => {
		try {
			const deletedMenuItem = await dispatch(
				deleteMenuItem(restaurantId, menuItemId)
			);
			if (deletedMenuItem) {
				closeModal();
				await dispatch(getMenuItems(restaurantId));
				await dispatch(getRestaurantDetail(restaurantId));
				history.push(`/restaurants/${restaurantId}`);
			}
		} catch (error) {
			console.error("Delete failed:", error);
		}
	};

	return (
		<div className="delete-container">
			<h2 className="borp">Confirm Delete</h2>
			<p className="delete-text">
				Are you sure you want to remove this menu item?
			</p>
			<div className="button57-container">
				<button className="yes-button1" onClick={() => handleDelete()}>
					YES (Delete menu item)
				</button>
				<button className="no-button1" onClick={() => closeModal()}>
					NO (Keep menu item)
				</button>
			</div>
		</div>
	);
};

export default DeleteMenuItemPage;
