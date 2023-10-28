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

	// const totalReviews = restaurant?.reviews?.length;
	// const totalRating = restaurant?.reviews?.reduce(
	// 	(acc, review) => acc + review.stars,
	// 	0
	// );
	// const avgRating = totalReviews
	// 	? (totalRating / totalReviews).toFixed(1)
	// 	: 0;

	// const renderStarRating = () => {
	// 	const filledStars = Math.round(avgRating); // Round the average rating to the nearest whole number
	// 	const starArray = [];

	// 	for (let i = 1; i <= 5; i++) {
	// 		starArray.push(
	// 			<span
	// 				key={i}
	// 				className={`material-symbols-outlined${
	// 					i <= filledStars ? " checked" : ""
	// 				}`}
	// 			>
	// 				star
	// 			</span>
	// 		);
	// 	}

	// 	return starArray;
	// };

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
			<div className="res-img-info-detail-container">
				<div id="res-preview-img-detail-container">
					<div className="img-container">
						<img
							id="res-preview-img-detail"
							src={restaurant?.preview_image}
							alt="food"
						></img>
					</div>
					<div className="res-rating-name-detail-container">
						<div id="res-name-detail">{restaurant?.name}</div>
						{restaurant?.avg_rating > 0 ? (
							<div className="rating-price-container">
								<span id="res-rating-detail">
									<div id="res-price-detail">
										{restaurant?.price_range === 4
											? "$$$$"
											: restaurant?.price_range === 3
											? "$$$"
											: restaurant?.price_range === 2
											? "$$"
											: restaurant?.price_range === 1
											? "$"
											: null}
									</div>
									<div id="res-center-dot-detail">|</div>{" "}
									<div>
										<i
											id="res-star-icon-detail"
											className="fa-solid fa-star"
										></i>
									</div>
									{restaurant?.avg_rating.toFixed(1)}
									{restaurant?.reviews?.length > 0 ? (
										<span id="res-review-length-detail">
											({restaurant?.reviews?.length}{" "}
											{restaurant?.reviews?.length === 1
												? "review"
												: "reviews"}
											)
										</span>
									) : null}
								</span>
							</div>
						) : (
							<div className="new-container">
								<div id="res-price-detail">
									{restaurant?.price_range === 4
										? "$$$$"
										: restaurant?.price_range === 3
										? "$$$"
										: restaurant?.price_range === 2
										? "$$"
										: restaurant?.price_range === 1
										? "$"
										: null}
								</div>
								<div id="new-text">
									- this restaurant has no reviews.
								</div>
							</div>
						)}
					</div>
					<div id="res-address-detail">
						({restaurant?.address}, {restaurant?.city},{" "}
						{restaurant?.state}, {restaurant?.country})
					</div>

					<div id="res-desc-detail">{restaurant?.description}</div>

					<div className="price-tile-text">
						<div className="auth-buttons">
							{currentUser?.id === restaurant?.user_id && (
								<div id="manage-buttons">
									<div className="update-res-btn-container">
										<button
											id="update-res-btn"
											onClick={() =>
												history.push(
													`/restaurants/${restaurant?.id}/edit`
												)
											}
										>
											update restaurant
										</button>
									</div>
									<div className="create-menu-item-btn-container">
										<button
											id="create-menu-btn"
											onClick={() =>
												history.push(
													`/restaurants/${restaurant?.id}/create-menu-item`
												)
											}
										>
											create menu item
										</button>
									</div>
									<div className="delete-res-btn-container">
										<OpenModalButton
											buttonText="delete restaurant"
											modalComponent={
												<DeleteRestaurantModal
													restaurantId={
														restaurant?.id
													}
												/>
											}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="menu-items">
					{menuItemsValues ? (
						menuItemsValues.map((menu_item) => (
							<div className="menu-item-main" key={menu_item?.id}>
								<div id="menu-item-container">
									<img
										id="menu-item-img"
										src={menu_item?.preview_image}
										alt="food"
									></img>
									<div className="menu-item-info">
										<div className="btn-included-name-container">
											<div className="name-delete-btn">
												<div id="menu-item-name-detail">
													{menu_item?.name}
												</div>
												<div>
													{restaurant?.user_id ===
														currentUser?.id && (
														<span id="delete-menu-item-btn-detail">
															<OpenModalButton
																id="delete-menu-item-btn-detail"
																buttonText={
																	<span
																		className="material-symbols-outlined"
																		id="delete-button-id"
																	>
																		close
																	</span>
																}
																modalComponent={
																	<DeleteMenuItemPage
																		menuItemId={
																			menu_item?.id
																		}
																		restaurantId={
																			restaurant?.id
																		}
																	/>
																}
															/>
														</span>
													)}
												</div>
											</div>

											<div id="menu-item-desc-detail">
												{menu_item?.description}
											</div>
										</div>

										<div className="cart-btn-price-container">
											<div id="menu-item-price-detail">
												<span id="dollar-sign-menu-item">
													$
												</span>
												{menu_item?.price.toFixed(2)}
											</div>

											{currentUser && (
												<button
													id="add-to-cart-btn"
													onClick={(e) =>
														cartItemAdd(
															e,
															menu_item
														)
													}
													disabled={validSubmit}
												>
													add to cart
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div>Loading menu items...</div>
					)}
				</div>
			</div>

			<div className="all-reviews-container-container">
				{restaurant?.reviews?.length > 0 ? (
					<div id="reviews-for-res-detail-text">
						reviews for {restaurant?.name}
					</div>
				) : (
					<div id="share-your-experience-text">
						share your experiences below...
					</div>
				)}
				{/* <div className="restaurant-average-rating">
					<div className="rating-stars">{renderStarRating()}</div>
					<div id="num-ratings-text">{totalReviews} reviews</div>
				</div> */}
				{currentUser?.id !== restaurant?.user_id && currentUser?.id && (
					<div className="review-btn-detail-container">
						<button
							id="review-btn-detail"
							onClick={() =>
								history.push(
									`/restaurants/${restaurant?.id}/create-review`
								)
							}
						>
							leave a review
						</button>
					</div>
				)}
				<div className="all-reviews-container">
					{restaurant?.reviews?.map((review) => (
						<div className="indv-reviews" key={review?.id}>
							<div>
								<div className="profile-name-combo-detail">
									<div
										id="profile-circle-reviews"
										className="material-symbols-outlined"
									>
										account_circle
									</div>
									<div id="review-username-text">
										{" "}
										{review?.user?.username}
									</div>
								</div>
								<div className="stars-container">
									{[...Array(review?.stars)].map((_, i) => (
										<span id="star-review" key={i}>
											★
										</span>
									))}
									<span id="timestamp-review">
										{review?.createdAt}
									</span>
								</div>
							</div>
							<div>
								<div className="review-text">
									"{review?.review_text}"
								</div>
								{review?.user?.id === currentUser?.id && (
									<div className="manage-rev-buttons">
										<div className="update-review-container">
											<button
												id="update-review-btn"
												onClick={() =>
													history.push(
														`/restaurants/${restaurant?.id}/review/${review?.id}/update`
													)
												}
											>
												Update Review
											</button>
										</div>
										<div id="delete-review-btn-container">
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
