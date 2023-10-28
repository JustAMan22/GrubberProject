import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteCartItem, getUserCartItems } from "../../store/cart";
import { createCartAndCartItem, getUserCart } from "../../store/shoppingcart";
import "./Navigation.css";

function ShoppingCart({ user, isLoaded }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showMenu, setShowMenu] = useState(false);
	const cartItems = useSelector((state) => state?.cartItem);
	const userCart = useSelector((state) => state?.shoppingCart);
	const ulRef = useRef();
	const isInitialFetch = useRef(false);
	const [validSubmitMinus, setValidSubmitMinus] = useState(false);
	const [validSubmitAdd, setValidSubmitAdd] = useState(false);

	const cartValues = Object.values(cartItems);
	const userCartValue = Object.values(userCart);
	// console.log("THIS IS USER CART", userCartValue);
	// console.log("THIS IS CART ITEMS", cartValues);

	let subTotal = 0;

	for (const cartItem of cartValues) {
		let multipliedTotal = cartItem?.menu_item?.price * cartItem?.quantity;
		subTotal += multipliedTotal;
	}

	const openMenu = async () => {
		if (showMenu) return;
		setShowMenu(true);
		await dispatch(getUserCartItems());

		if (!isInitialFetch.current) {
			isInitialFetch.current = true;
		}
	};

	const cartItemRemove = async (cartItem) => {
		const cartItemId = cartItem.id;
		try {
			const deletedCartItem = await dispatch(deleteCartItem(cartItemId));
			if (deletedCartItem) {
				await dispatch(getUserCartItems());
				await dispatch(getUserCart());
			}
		} catch (error) {
			console.error("dispatch failed for user cart items", error);
		}
	};

	const updateQuantitySubtract = async (
		e,
		menuItemId,
		restaurantId,
		quantity
	) => {
		e.preventDefault();

		let cartItemDataPayload = {
			quantity: -1,
		};

		if (quantity > 1) {
			setValidSubmitMinus(true);
			try {
				const updatedCart = await dispatch(
					createCartAndCartItem(
						restaurantId,
						menuItemId,
						cartItemDataPayload
					)
				);
				if (updatedCart) {
					await dispatch(getUserCartItems());
				}
			} catch (error) {
				console.error("cart item creation failed", error);
			}
			setValidSubmitMinus(false);
		}
	};
	const updateQuantityAdd = async (e, menuItemId, restaurantId, quantity) => {
		e.preventDefault();

		let cartItemDataPayload = {
			quantity: 1,
		};

		if (quantity >= 1) {
			setValidSubmitAdd(true);
			try {
				const updatedCart = await dispatch(
					createCartAndCartItem(
						restaurantId,
						menuItemId,
						cartItemDataPayload
					)
				);
				if (updatedCart) {
					await dispatch(getUserCartItems());
				}
			} catch (error) {
				console.error("cart item creation failed", error);
			}
			setValidSubmitAdd(false);
		}
	};

	const ulClassName = "cart-dropdown" + (showMenu ? "" : " cart-hidden");

	useEffect(() => {
		dispatch(getUserCart());
	}, [dispatch]);

	useEffect(() => {
		if (showMenu) {
			const closeMenu = (e) => {
				if (!ulRef.current.contains(e.target)) {
					setShowMenu(false);
				}
			};
			document.addEventListener("click", closeMenu);

			return () => document.removeEventListener("click", closeMenu);
		}
	}, [showMenu]);

	return (
		<div>
			<button className="shopping-cart-button" onClick={openMenu}>
				<div className="cart-icon-and-item-count-container">
					<span
						className="material-symbols-outlined"
						id="shopping-cart-id"
					>
						shopping_cart
					</span>
					{/* <span id="cart-item-count"> • {cartValues?.length}</span> */}
				</div>
			</button>
			<ul className={ulClassName} ref={ulRef}>
				{isLoaded &&
				user &&
				userCartValue.length >= 1 &&
				cartValues.length >= 1 ? (
					<div className="cart-item-container">
						{Object?.values(cartItems)?.map((cartItem) => (
							<div key={cartItem?.id} className="indv-cart-items-container-container">
								<div
									key={cartItem?.id}
									className="indv-cart-items"
								>
									<div className="preview-img-container">
										<img
											className="preview-img"
											src={
												cartItem?.menu_item
													?.preview_image
											}
											alt="food"
										/>
									</div>
									<div className="cart-item-all-texts-container">
										<div className="name-price-quantity-container">
											<div className="quantity-name-cointainer">
												<div className="cart-item-name-text">
													{cartItem?.menu_item?.name}
												</div>
												<div className="cart-item-desc-text">
													{/* <span id="desc-span">desc:</span> */}
													{
														cartItem?.menu_item
															?.description
													}
												</div>
											</div>
											<div className="cart-item-price-text">
												<span id="price-dollar-sign-text">
													$
												</span>
												{cartItem?.menu_item?.price}
												<span className="quantity-btns-only">
													<span className="minus-btn-span">
														<button
															disabled={
																validSubmitMinus
															}
															className="minus-btn"
															onClick={(e) =>
																updateQuantitySubtract(
																	e,
																	cartItem
																		?.menu_item
																		?.id,
																	cartItem
																		?.menu_item
																		?.restaurant_id,
																	cartItem?.quantity
																)
															}
														>
															-
														</button>
													</span>
													<span className="cart-item-quantity-text">
														{cartItem?.quantity}
													</span>
													<span className="add-btn-span">
														<button
															disabled={
																validSubmitAdd
															}
															className="add-btn"
															onClick={(e) =>
																updateQuantityAdd(
																	e,
																	cartItem
																		?.menu_item
																		?.id,
																	cartItem
																		?.menu_item
																		?.restaurant_id,
																	cartItem?.quantity
																)
															}
														>
															+
														</button>
													</span>
												</span>
											</div>
										</div>
									</div>
									<div className="delete-btn-container">
										<button
											onClick={() =>
												cartItemRemove(cartItem)
											}
											className="delete-btn-actual"
										>
											<span
												className="material-symbols-outlined"
												id="delete-button-id"
											>
												close
											</span>
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="add-items-text-container">
						<i
							id="shopping-cart-text-logo"
							className="fa-solid fa-cart-shopping"
						></i>
						<div className="add-items-text-2">
							add items from a restaurant to get started.
						</div>
					</div>
				)}
				{isLoaded &&
				user &&
				userCartValue.length &&
				cartValues.length >= 1 ? (
					<div className="checkout-btn-div">
						<button
							className="checkout-btn"
							onClick={() => {
								history.push("/checkout");
							}}
						>
							checkout
						</button>
						<span className="total-text">
							total: <span className="total-dollar-sign">$</span>
							{subTotal.toFixed(2)}
						</span>
					</div>
				) : null}
			</ul>
		</div>
	);
}

export default ShoppingCart;
