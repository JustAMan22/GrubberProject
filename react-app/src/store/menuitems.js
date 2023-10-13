const CREATE_MENU_ITEM = "CREATE_MENU_ITEM";
const DELETE_MENU_ITEM = "DELETE_MENU_ITEM";
const CREATE_CART_AND_CART_ITEM = "CREATE_CART_AND_CART_ITEM";
const GET_ALL_USER_CART_ITEMS = "GET_ALL_USER_CART_ITEMS";

const createMenuItemAction = (menuItem) => ({
  type: CREATE_MENU_ITEM,
  menuItem,
});

const deleteMenuItemAction = (menuItemId) => ({
  type: DELETE_MENU_ITEM,
  menuItemId,
});

const createCartAndCartItemAction = (shoppingCart) => ({
  type: CREATE_CART_AND_CART_ITEM,
  shoppingCart,
});

const getUserCartItemsAction = (cartItems) => ({
  type: GET_ALL_USER_CART_ITEMS,
  cartItems,
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

export const getUserCartItems = () => async (dispatch) => {
  const res = await fetch("/api/shoppingcart/cart-items");

  if (res.ok) {
    const userCartItems = await res.json();
    dispatch(getUserCartItemsAction(userCartItems));
    return res;
  }
};

const menuItemReducer = (state = {}, action) => {
  let newState = { ...state };

  switch (action.type) {
    case CREATE_MENU_ITEM:
      newState[action.menuItem.id] = action.menuItem;
      return newState;
    case CREATE_CART_AND_CART_ITEM:
      newState[action.shoppingCart.id] = action.shoppingCart;
      return newState;
    case GET_ALL_USER_CART_ITEMS:
      newState = {};
      action.cartItems.forEach((cartItem) => {
        newState[cartItem.id] = cartItem;
      });
      return newState;
    case DELETE_MENU_ITEM:
      delete newState[action.menuItemId];
      return newState;
    default:
      return state;
  }
};

export default menuItemReducer;
