const GET_ALL_RESTAURANTS = "GET_ALL_RESTAURANTS";
const GET_RESTAURANT_DETAIL = "GET_RESTAURANT_ DETAIL";
const CREATE_RESTAURANT = "CREATE_RESTAURANT";
const UPDATE_RESTAURANT = "UPDATE_RESTAURANT";
const DELETE_RESTAURANT = "DELETE_RESTAURANT";
const SEARCHED_RESTAURANTS = "SEARCHED_RESTAURANTS";

const getAllRestaurantsAction = (restaurants) => ({
	type: GET_ALL_RESTAURANTS,
	restaurants,
});

const getSearchedRestaurants = (filteredRestaurants) => ({
	type: SEARCHED_RESTAURANTS,
	filteredRestaurants,
});

const getRestaurantDetailAction = (restaurant) => ({
	type: GET_RESTAURANT_DETAIL,
	restaurant,
});

const createRestaurantAction = (restaurantData) => ({
	type: CREATE_RESTAURANT,
	restaurantData,
});

const updateRestaurantAction = (restaurantUpdateData) => ({
	type: UPDATE_RESTAURANT,
	restaurantUpdateData,
});

const deleteRestaurantAction = (restaurantId) => ({
	type: DELETE_RESTAURANT,
	restaurantId,
});

export const getAllRestaurants = () => async (dispatch) => {
	const res = await fetch("/api/restaurants");

	if (res.ok) {
		const restaurants = await res.json();
		dispatch(getAllRestaurantsAction(restaurants));
		return res;
	}
};

export const getRestaurantDetail = (restaurantId) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${restaurantId}`);

	if (res.ok) {
		const restaurantDetail = await res.json();
		dispatch(getRestaurantDetailAction(restaurantDetail));
		return res;
	}
};

export const getFilteredRestaurants = (name) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/search?name=${name}`);

	if (res.ok) {
		const filteredRestaurantsRes = await res.json();
		dispatch(getSearchedRestaurants(filteredRestaurantsRes));
		return res;
	}
};

export const createRestaurant = (restaurantDataDetails) => async (dispatch) => {
	const res = await fetch("/api/restaurants/create", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(restaurantDataDetails),
	});

	if (res.ok) {
		const newRestaurant = await res.json();
		dispatch(createRestaurantAction(newRestaurant));
		return newRestaurant;
	}
};

export const updateRestaurant =
	(restaurantId, restaurantUpdatedData) => async (dispatch) => {
		const res = await fetch(`/api/restaurants/${restaurantId}/edit`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(restaurantUpdatedData),
		});
		const restaurant = await res.json();
		dispatch(updateRestaurantAction(restaurant));
		return res;
	};

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${restaurantId}/delete`, {
		method: "DELETE",
	});
	dispatch(deleteRestaurantAction(restaurantId));
	return res;
};

const restaurantReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case GET_ALL_RESTAURANTS:
			newState = {};
			action.restaurants.forEach((restaurant) => {
				newState[restaurant.id] = restaurant;
			});
			return newState;
		case SEARCHED_RESTAURANTS:
			newState = {};
			action.filteredRestaurants.forEach((foundRestaurant) => {
				newState[foundRestaurant.id] = foundRestaurant;
			});
			return newState;
		case GET_RESTAURANT_DETAIL:
			newState[action.restaurant.id] = action.restaurant;
			return newState;
		case DELETE_RESTAURANT:
			delete newState[action.restaurantId];
			return newState;
		default:
			return state;
	}
};

export default restaurantReducer;
