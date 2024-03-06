const SEARCHED_RESTAURANTS = "SEARCHED_RESTAURANTS";

const getSearchedRestaurants = (filteredRestaurants) => ({
	type: SEARCHED_RESTAURANTS,
	filteredRestaurants,
});


export const getFilteredRestaurants = (name) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/search?name=${name}`);

	if (res.ok) {
		const filteredRestaurantsRes = await res.json();
		dispatch(getSearchedRestaurants(filteredRestaurantsRes));
		return res;
	}
};

const foundRestaurantsReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case SEARCHED_RESTAURANTS:
			newState = {};
			action.filteredRestaurants.forEach((foundRestaurant) => {
				newState[foundRestaurant.id] = foundRestaurant;
			});
			return newState;
		default:
			return state;
	}
};

export default foundRestaurantsReducer;