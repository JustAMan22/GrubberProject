import React from "react";
import { useDispatch } from "react-redux";
import { getRestaurantDetail } from "../../store/restaurants";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteMenuItem, getMenuItems } from "../../store/menuitems";
import "./DeleteMenuItem.css";

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
				await dispatch(getMenuItems(restaurantId));
				await dispatch(getRestaurantDetail(restaurantId));
				closeModal();
				history.push(`/restaurants/${restaurantId}`);
			}
		} catch (error) {
			console.error("Delete failed:", error);
		}
	};

	return (
		<div className="delete-container">
			<div className="confirm">confirm delete.</div>
			<div className="delete-text">
				are you sure you want to remove this menu item?
			</div>
			<div className="delete-buttons-container">
				<button className="delete-btns-modal" onClick={() => handleDelete()}>
					yes (remove menu item.)
				</button>
				<button className="delete-btns-modal" onClick={() => closeModal()}>
					no (keep menu item.)
				</button>
			</div>
		</div>
	);
};

export default DeleteMenuItemPage;
