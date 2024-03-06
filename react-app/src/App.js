import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GetAllRestaurantsPage from "./components/GetAllRestaurants";
import GetRestaurantDetailPage from "./components/GetRestaurantDetail";
import CreateRestaurantPage from "./components/CreateRestaurant";
import UpdateRestaurantPage from "./components/UpdateRestaurant";
import CreateReviewPage from "./components/CreateReview";
import UpdateReviewPage from "./components/UpdateReview";
import CreateMenuItemPage from "./components/CreateMenuItem";
import CheckoutPage from "./components/CheckoutPage";
import OrderSuccessfulPage from "./components/SuccessfulOrder";
import RestaurantSearchResults from "./components/RestaurantSearchResults";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(authenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path="/login">
						<LoginFormPage />
					</Route>
					<Route exact path="/signup">
						<SignupFormPage />
					</Route>
					<Route exact path="/restaurants/create">
						<CreateRestaurantPage />
					</Route>
					<Route
						exact
						path="/restaurants/:restaurantId/review/:reviewId/update"
					>
						<UpdateReviewPage />
					</Route>
					<Route
						exact
						path="/restaurants/:restaurantId/create-menu-item"
					>
						<CreateMenuItemPage />
					</Route>
					<Route
						exact
						path="/restaurants/:restaurantId/create-review"
					>
						<CreateReviewPage />
					</Route>
					<Route exact path="/restaurants/:restaurantId/edit">
						<UpdateRestaurantPage />
					</Route>
					<Route exact path="/restaurants/:restaurantId">
						<GetRestaurantDetailPage />
					</Route>
					<Route exact path="/restaurants/search/:name">
						<RestaurantSearchResults />
					</Route>
					<Route exact path="/checkout">
						<CheckoutPage />
					</Route>
					<Route exact path="/order-confirmation">
						<OrderSuccessfulPage />
					</Route>
					<Route exact path="/">
						<GetAllRestaurantsPage />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
