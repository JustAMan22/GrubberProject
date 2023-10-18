import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Navigation.css";
import { deleteCartItem, getUserCartItems } from "../../store/cart";

function ShoppingCart({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showMenu, setShowMenu] = useState(false);
	const cartItems = useSelector((state) => state?.cartItem);
	const ulRef = useRef();
	const isInitialFetch = useRef(false);

	const cartValues = Object.values(cartItems);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);

		if (!isInitialFetch.current) {
			dispatch(getUserCartItems());
			isInitialFetch.current = true;
		}
	};

	const cartItemRemove = async (cartItem) => {
		const cartItemId = cartItem.id;
		try {
			const deletedCartItem = await dispatch(deleteCartItem(cartItemId));
			if (deletedCartItem) {
				await dispatch(getUserCartItems());
			}
		} catch (error) {
			console.error("dispatch failed for user cart items", error);
		}
	};

	const ulClassName = "cart-dropdown" + (showMenu ? "" : " cart-hidden");

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
			<button className="profile-button" onClick={openMenu}>
				<span className="material-symbols-outlined">shopping_cart</span>
			</button>
			<ul className={ulClassName} ref={ulRef}>
				{user && cartValues.length >= 1 ? (
					<div className="cart-item-container">
						{Object?.values(cartItems)?.map((cartItem) => (
							<div key={cartItem.id} className="indv-cart-items">
								<div>
									{cartItem?.menu_item?.name}
									<div>{cartItem?.quantity}</div>
								</div>
								<div>
									<button
										onClick={() => cartItemRemove(cartItem)}
									>
										delete item(s)
									</button>
								</div>
							</div>
						))}
						<div>
							<button onClick={() => {history.push("/checkout")}}>checkout</button>
						</div>
					</div>
				) : (
					<div>Add items to cart...</div>
				)}
			</ul>
		</div>
	);
}

export default ShoppingCart;
