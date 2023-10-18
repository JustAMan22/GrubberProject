import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getRestaurantDetail } from "../../store/restaurants";
import { getUserCartItems } from "../../store/cart";
import { getUserCart } from "../../store/shoppingcart";
import OpenModalButton from "../OpenModalButton";
import DeleteRestaurantModal from "../DeleteRestaurant";
import "./GetRestaurant.css";
import DeleteReviewPage from "../DeleteReview";
import DeleteMenuItemPage from "../DeleteMenuItem";
import { createCartAndCartItem } from "../../store/shoppingcart";
import { getMenuItems } from "../../store/menuitems";

function GetRestaurantDetailPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { restaurantId } = useParams();
	const restaurant = useSelector((state) => state?.restaurant[restaurantId]);
	const userCart = useSelector((state) => state?.shoppingCart["1"]);
	const menuItems = useSelector((state) => state?.menuItem);
	const currentUser = useSelector((state) => state?.session.user);
	const [validSubmit, setValidSubmit] = useState(false);
	const menuItemsValues = Object.values(menuItems);
	console.log("THIS IS MENU ITEMS!!", menuItemsValues);

	const cartItemAdd = async (e, menu_item) => {
		e.preventDefault();

		const menuItemId = menu_item?.id;

		if (
			menu_item?.restaurant_id ===
				userCart?.cart_items[0]?.menu_item?.restaurant_id ||
			!userCart?.cart_items?.length
		) {
			setValidSubmit(true);
			let cartItemDataPayload = {
				quantity: 1,
			};

			try {
				const cart = await dispatch(
					createCartAndCartItem(
						restaurantId,
						menuItemId,
						cartItemDataPayload
					)
				);
				if (cart) {
					await dispatch(getUserCartItems());
					await dispatch(getUserCart());
				}
			} catch (error) {
				console.error("cart item creation failed", error);
			}
			setValidSubmit(false);
		}
	};

	useEffect(() => {
		dispatch(getRestaurantDetail(restaurantId));
		dispatch(getUserCart());
		dispatch(getMenuItems(restaurantId));
	}, [dispatch, restaurantId]);

	return (
		<div className="res-detail-container">
			<h1>
				{restaurant?.name} ({restaurant?.address})
			</h1>
			<span>
				<img src={restaurant?.preview_image} alt="food"></img>
			</span>
			<h3>
				{restaurant?.avg_rating} • ({restaurant?.reviews.length}{" "}
				ratings)
			</h3>
			<div className="price-tile-text">
				{restaurant?.price_range === 4
					? "$$$$"
					: restaurant?.price_range === 3
					? "$$$"
					: restaurant?.price_range === 2
					? "$$"
					: restaurant?.price_range === 1
					? "$"
					: null}
				<div className="auth-buttons">
					{currentUser?.id !== restaurant?.user_id &&
						currentUser?.id && (
							<button
								onClick={() =>
									history.push(
										`/restaurants/${restaurant?.id}/create-review`
									)
								}
							>
								Leave a review
							</button>
						)}
					{currentUser?.id === restaurant?.user_id && (
						<div id="manage-buttons">
							<button
								onClick={() =>
									history.push(
										`/restaurants/${restaurant?.id}/edit`
									)
								}
							>
								Update Restaurant Info
							</button>
							<button
								onClick={() =>
									history.push(
										`/restaurants/${restaurant?.id}/create-menu-item`
									)
								}
							>
								create menu item.
							</button>
							<OpenModalButton
								buttonText="Delete Restaurant"
								modalComponent={
									<DeleteRestaurantModal
										restaurantId={restaurant?.id}
									/>
								}
							/>
						</div>
					)}
				</div>
				<div className="menu-items">
					{menuItemsValues?.map((menu_item) => (
						<div
							className="menu-item-container"
							key={menu_item?.id}
						>
							<img
								src={menu_item?.preview_image}
								alt="food"
							></img>
							<div>{menu_item?.name}</div>
							<div>{menu_item?.description}</div>
							<div>{menu_item?.price}</div>
							{restaurant?.user_id === currentUser?.id && (
								<OpenModalButton
									buttonText="Delete Menu Item"
									modalComponent={
										<DeleteMenuItemPage
											menuItemId={menu_item?.id}
											restaurantId={restaurant?.id}
										/>
									}
								/>
							)}
							{currentUser && (
								<>
									<button
										onClick={(e) =>
											cartItemAdd(e, menu_item)
										}
										disabled={validSubmit}
									>
										add to cart.
									</button>
								</>
							)}
						</div>
					))}
				</div>
				<div className="all-reviews-container">
					{restaurant?.reviews?.map((review) => (
						<div className="indv-reviews" key={review?.id}>
							<div>
								<div>{review?.user?.username}</div>
								{[...Array(review?.stars)].map((_, i) => (
									<span key={i}>★</span>
								))}
							</div>
							<div>
								<div className="review-text">
									{review?.review_text}
								</div>
								{review?.user?.id === currentUser?.id && (
									<div id="manage-rev-buttons">
										<button
											onClick={() =>
												history.push(
													`/restaurants/${restaurant?.id}/review/${review?.id}/update`
												)
											}
										>
											Update Review
										</button>
										<OpenModalButton
											buttonText="Delete Review"
											modalComponent={
												<DeleteReviewPage
													reviewId={review?.id}
													restaurantId={
														restaurant?.id
													}
												/>
											}
										/>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default GetRestaurantDetailPage;
