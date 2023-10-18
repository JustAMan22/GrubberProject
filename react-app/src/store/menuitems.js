const CREATE_MENU_ITEM = "CREATE_MENU_ITEM";
const DELETE_MENU_ITEM = "DELETE_MENU_ITEM";
const GET_MENU_ITEMS = "GET_MENU_ITEMS";

const createMenuItemAction = (menuItem) => ({
	type: CREATE_MENU_ITEM,
	menuItem,
});

const getMenuItemsAction = (menuItems) => ({
	type: GET_MENU_ITEMS,
	menuItems,
});

const deleteMenuItemAction = (menuItemId) => ({
	type: DELETE_MENU_ITEM,
	menuItemId,
});

export const createMenuItem =
	(restaurantId, menuItemData) => async (dispatch) => {
		const res = await fetch(
			`/api/restaurants/${restaurantId}/menu-item/create`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(menuItemData),
			}
		);

		if (res.ok) {
			const menuItem = await res.json();
			dispatch(createMenuItemAction(menuItem));
			return menuItem;
		} else {
			const errors = await res.json();
			return errors;
		}
	};

export const getMenuItems = (restaurantId) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${restaurantId}/menu-items`);

	if (res.ok) {
		const resMenuItems = await res.json();
		dispatch(getMenuItemsAction(resMenuItems));
		return res;
	} else {
		console.log(res);
	}
};

export const deleteMenuItem =
	(restaurantId, menuItemId) => async (dispatch) => {
		const res = fetch(
			`/api/restaurants/${restaurantId}/menu-item/${menuItemId}/delete`,
			{
				method: "DELETE",
			}
		);

		if (!res.ok) {
			return "Menu item couldn't be removed";
		}
		dispatch(deleteMenuItemAction(menuItemId));
	};

const menuItemReducer = (state = {}, action) => {
	let newState = { ...state };

	switch (action.type) {
		case GET_MENU_ITEMS:
			newState = {};
			action.menuItems.forEach((menuItem) => {
				newState[menuItem.id] = menuItem;
			});
			return newState;
		case CREATE_MENU_ITEM:
			newState[action.menuItem.id] = action.menuItem;
			return newState;
		case DELETE_MENU_ITEM:
			delete newState[action.menuItemId];
			return newState;
		default:
			return state;
	}
};

export default menuItemReducer;
