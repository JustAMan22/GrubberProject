import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserCartItems, deleteCartItem } from "../../store/cart";
import { createCartAndCartItem } from "../../store/shoppingcart";
import "./CheckoutPage.css";

function CheckoutPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const cartItems = useSelector((state) => state?.cartItem);
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [errors, setErrors] = useState({});
	const [validSubmit, setValidSubmit] = useState(false);
	const [validSubmitMinus, setValidSubmitMinus] = useState(false);
	const [validSubmitAdd, setValidSubmitAdd] = useState(false);

	const updateAddress = (e) => setAddress(e.target.value);
	const updateCity = (e) => setCity(e.target.value);
	const updateState = (e) => setState(e.target.value);
	const updateCountry = (e) => setCountry(e.target.value);

	const cartValues = Object.values(cartItems);

	let subTotal = 0;

	for (const cartItem of cartValues) {
		let multipliedTotal = cartItem?.menu_item?.price * cartItem?.quantity;
		subTotal += multipliedTotal;
	}

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

	useEffect(() => {
		dispatch(getUserCartItems());
	}, [dispatch]);

	const handleOrderPlacement = async (e) => {
		e.preventDefault();

		const errors = {};
		if (!address) {
			errors.address = "street address is required!";
		}
		if (address.length >= 25) {
			errors.address = "address must be less than 25 characters!";
		}
		if (!city) {
			errors.city = "city is required!";
		}
		if (city.length >= 20) {
			errors.city = "city must be less than 20 characters!";
		}
		if (!state) {
			errors.state = "state is required!";
		}
		if (state.length > 2 || state.length < 2) {
			errors.state = "please use state abbreviation.";
		}
		if (!country) {
			errors.country = "country is required!";
		}
		if (country.length >= 20) {
			errors.country = "country must be less than 20 characters!";
		}
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setValidSubmit(true);
			for (const cartItem of Object.values(cartItems)) {
				try {
					const deletedCartItem = await dispatch(
						deleteCartItem(cartItem?.id)
					);
					if (deletedCartItem) {
						await dispatch(getUserCartItems());
					}
				} catch (error) {
					console.error("dispatch failed for user cart items", error);
				}
			}
			history.push("/order-confirmation");
		} else setValidSubmit(false);
	};

	return (
		<div className="checkout-page-container">
			<div className="checkout-form">
				<div className="delivery-info-text">
					please enter your delivery information.
				</div>
				<form
					onSubmit={handleOrderPlacement}
					className="checkout-page-address-form"
				>
					<div className="grid-form-container">
						<div className="form-group">
							<div className="checkout-label-text">address</div>
							<input
								type="text"
								id="address"
								placeholder="enter your address."
								value={address}
								onChange={updateAddress}
								className={`input-field ${
									errors.address ? "error" : ""
								}`}
							/>
							{errors.address && (
								<div className="error-message-container">
									<span className="error-message-text">
										⚠︎ {errors.address}
									</span>
								</div>
							)}
						</div>
						<div className="form-group">
							<div className="checkout-label-text">city</div>
							<input
								type="text"
								id="city"
								placeholder="enter your city."
								value={city}
								onChange={updateCity}
								className={`input-field ${
									errors.city ? "error" : ""
								}`}
							/>
							{errors.city && (
								<div className="error-message-container">
									<span className="error-message-text">
										⚠︎ {errors.city}
									</span>
								</div>
							)}
						</div>
						<div className="form-group">
							<div className="checkout-label-text">state</div>
							<input
								type="text"
								id="state"
								placeholder="enter your state."
								value={state}
								onChange={updateState}
								className={`input-field ${
									errors.state ? "error" : ""
								}`}
							/>
							{errors.state && (
								<div className="error-message-container">
									<span className="error-message-text">
										⚠︎ {errors.state}
									</span>
								</div>
							)}
						</div>
						<div className="form-group">
							<div className="checkout-label-text">country</div>
							<input
								type="text"
								id="country"
								placeholder="enter your country."
								value={country}
								onChange={updateCountry}
								className={`input-field ${
									errors.country ? "error" : ""
								}`}
							/>
							{errors.country && (
								<div className="error-message-container">
									<span className="error-message-text">
										⚠︎ {errors.country}
									</span>
								</div>
							)}
						</div>
					</div>
					<div className="total-order-btn">
						<div>
							<span className="total-text-checkout">
								order total:{" "}
								<span className="total-dollar-sign">$</span>
								{subTotal.toFixed(2)}
							</span>
						</div>
						<div className="place-order-button-div">
							<button
								type="submit"
								className="place-order-button"
								disabled={validSubmit}
							>
								place order
							</button>
						</div>
					</div>
				</form>
			</div>

			<div className="checkout-cart-items">
				<div className="cart-item-container-checkout">
					{Object?.values(cartItems)?.map((cartItem) => (
						<div key={cartItem.id} className="indv-cart-items">
							<div className="preview-img-container">
								<img
									className="preview-img"
									src={cartItem?.menu_item?.preview_image}
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
											{cartItem?.menu_item?.description}
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
													disabled={validSubmitMinus}
													className="minus-btn"
													onClick={(e) =>
														updateQuantitySubtract(
															e,
															cartItem?.menu_item
																?.id,
															cartItem?.menu_item
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
													disabled={validSubmitAdd}
													className="add-btn"
													onClick={(e) =>
														updateQuantityAdd(
															e,
															cartItem?.menu_item
																?.id,
															cartItem?.menu_item
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
									onClick={() => cartItemRemove(cartItem)}
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
					))}
				</div>
			</div>
		</div>
	);
}

export default CheckoutPage;
