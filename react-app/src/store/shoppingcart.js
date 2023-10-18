const GET_USER_CART = "GET_USER_CART";
const CREATE_CART_AND_CART_ITEM = "CREATE_CART_AND_CART_ITEM";
const DELETE_USER_CART = "DELETE_USER_CART";

const getUserCartAction = (shoppingCart) => ({
	type: GET_USER_CART,
	shoppingCart,
});

const createCartAndCartItemAction = (shoppingCart) => ({
	type: CREATE_CART_AND_CART_ITEM,
	shoppingCart,
});

const deleteUserCartAction = () => ({
	type: DELETE_USER_CART,
});

export const getUserCart = () => async (dispatch) => {
	const res = await fetch("/api/shoppingcart/");

	if (res.ok) {
		const currentUserCart = await res.json();
		dispatch(getUserCartAction(currentUserCart));
		return res;
	} else {
		console.log(res);
	}
};

export const createCartAndCartItem =
	(restaurantId, menuItemId, cartItemData) => async (dispatch) => {
		const res = await fetch(
			`/api/restaurants/${restaurantId}/menu-item/${menuItemId}/create-cart-item`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(cartItemData),
			}
		);

		if (res.ok) {
			const newCartItem = await res.json();
			dispatch(createCartAndCartItemAction(newCartItem));
			return newCartItem;
		} else {
			const errors = await res.json();
			return errors;
		}
	};

export const deleteUserCart = () => async (dispatch) => {
	const res = fetch(`/api/shoppingcart/delete`, {
		method: "DELETE",
	});

	if (res.ok) {
		dispatch(deleteUserCartAction());
	}
};
const shoppingCartReducer = (state = {}, action) => {
	let newState = { ...state };

	switch (action.type) {
		case GET_USER_CART:
			newState = {};
			newState[action.shoppingCart.id] = action.shoppingCart;
			return newState;
		case CREATE_CART_AND_CART_ITEM:
			newState[action.shoppingCart.id] = action.shoppingCart;
			return newState;
		case DELETE_USER_CART:
			delete newState["1"];
			return newState;
		default:
			return state;
	}
};

export default shoppingCartReducer;
