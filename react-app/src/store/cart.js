const GET_ALL_USER_CART_ITEMS = "GET_ALL_USER_CART_ITEMS";
const DELETE_CART_ITEM = "DELETE_CART_ITEM";

const getUserCartItemsAction = (cartItems) => ({
	type: GET_ALL_USER_CART_ITEMS,
	cartItems,
});

const deleteCartItemAction = (cartItemId) => ({
	type: DELETE_CART_ITEM,
	cartItemId,
});

export const getUserCartItems = () => async (dispatch) => {
	const res = await fetch("/api/shoppingcart/cart-items");

	if (res.ok) {
		const userCartItems = await res.json();
		dispatch(getUserCartItemsAction(userCartItems));
		return res;
	} else return res;
};

export const deleteCartItem = (cartItemId) => async (dispatch) => {
	const res = fetch(`/api/shoppingcart/cart-item/${cartItemId}`, {
		method: "DELETE",
	});

	if (res.ok) {
		dispatch(deleteCartItemAction(cartItemId));
	} else {
		return res;
	}
};

const cartItemReducer = (state = {}, action) => {
	let newState = { ...state };

	switch (action.type) {
		case GET_ALL_USER_CART_ITEMS:
			newState = {};
			const cartValues = Object.values(action?.cartItems);
			cartValues.forEach((cartItem) => {
				newState[cartItem.id] = cartItem;
			});
			return newState;
		case DELETE_CART_ITEM:
			delete newState[action.cartItemId];
			return newState;
		default:
			return state;
	}
};

export default cartItemReducer;
