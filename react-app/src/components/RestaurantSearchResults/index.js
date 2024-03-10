import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFilteredRestaurants } from "../../store/restaurants";
import "./RestaurantSearchResults.css";

function RestaurantSearchResults() {
	const dispatch = useDispatch();
	let { name } = useParams();
	const restaurantsResults = useSelector((state) => state.searchResults);

	// console.log(restaurantsResults);

	const resultsLoopy = Object.values(restaurantsResults);

	useEffect(() => {
		dispatch(getFilteredRestaurants(name));
	}, [dispatch, name]);

	return (
		<>
			{resultsLoopy?.length > 0 ? (
				<div>
					<div className="all-restaurants-container">
						{resultsLoopy?.map((restaurant) => (
							<div
								key={restaurant?.id}
								className="indv-restaurant-container"
							>
								<NavLink
									className="res-navlink"
									exact
									to={`/restaurants/${restaurant?.id}`}
									key={restaurant?.id}
								>
									<div
										className="indv-res-info"
										key={restaurant?.id}
									>
										<div key={restaurant?.id}>
											<div className="res-preview-img-container">
												<img
													className="res-img"
													src={
														restaurant?.preview_image
													}
													alt="food preview"
												/>
											</div>
											<div className="res-infos-container">
												<div className="res-rating-name-container">
													<div id="res-name-text">
														{restaurant?.name
															?.length >= 37
															? restaurant?.name.slice(
																	0,
																	36
															  ) + "..."
															: restaurant?.name}
													</div>
													<div className="res-rating-text">
														<div id="res-price-range">
															{restaurant?.price_range ===
															1
																? "$"
																: restaurant?.price_range ===
																  2
																? "$$"
																: restaurant?.price_range ===
																  3
																? "$$$"
																: restaurant?.price_range ===
																  4
																? "$$$$"
																: ""}
														</div>
														<span id="res-center-dot">
															·
														</span>{" "}
														{restaurant?.avg_rating >
														0 ? (
															<>
																<i
																	id="res-star-icon"
																	className="fa-solid fa-star"
																></i>
																<span id="res-rating-fr">
																	{restaurant?.avg_rating.toFixed(
																		1
																	)}
																</span>
															</>
														) : (
															"new"
														)}
													</div>
												</div>

												<div className="res-address-text">
													({restaurant?.address},{" "}
													{restaurant?.city},{" "}
													{restaurant?.state}){" "}
													{restaurant?.reviews
														?.length > 0 ? (
														<div id="res-review-length">
															(
															{
																restaurant
																	?.reviews
																	?.length
															}{" "}
															{restaurant?.reviews
																?.length === 1
																? "review"
																: "reviews"}
															)
														</div>
													) : null}
												</div>
												<div className="res-preview-review-container">
													{restaurant?.reviews
														?.length > 0 ? (
														<>
															<i
																id="bubble-icon"
																className="fa-solid fa-comment"
															></i>
															<span id="res-preview-review-text">
																{restaurant?.reviews[
																	restaurant
																		?.reviews
																		.length -
																		1
																]?.review_text.slice(
																	0,
																	60
																)}
																{restaurant
																	?.reviews[
																	restaurant
																		?.reviews
																		.length -
																		1
																]?.review_text
																	.length >
																60 ? (
																	<>
																		<span id="res-more-text">
																			...more
																		</span>
																	</>
																) : (
																	""
																)}
															</span>
														</>
													) : (
														<>
															<span id="no-review-text">
																be the first to
																review...
															</span>
														</>
													)}
												</div>
											</div>
										</div>
									</div>
								</NavLink>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="no-results-info">
					Sorry no restaurants found...
				</div>
			)}
		</>
	);
}

export default RestaurantSearchResults;
