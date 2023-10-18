import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllRestaurants } from "../../store/restaurants";

function GetAllRestaurantsPage() {
	const dispatch = useDispatch();
	const restaurants = useSelector((state) => state?.restaurant);

	useEffect(() => {
		dispatch(getAllRestaurants());
	}, [dispatch]);

	const restaurantsValues = Object?.values(restaurants);

	return (
		<div>
			{restaurantsValues?.map((restaurant) => (
				<NavLink
					exact
					to={`/restaurants/${restaurant?.id}`}
					key={restaurant?.id}
				>
					<div key={restaurant?.id}>
						<div key={restaurant?.id}>
							<img
								src={restaurant?.preview_image}
								alt="food preview"
							></img>
							<h2>
								{restaurant?.name} ({restaurant?.address}){" "}
								{restaurant?.avg_rating}
							</h2>
						</div>
					</div>
				</NavLink>
			))}
		</div>
	);
}

export default GetAllRestaurantsPage;
