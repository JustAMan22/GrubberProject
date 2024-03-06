import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserCartItems, deleteCartItem } from "../../store/cart";
import { createCartAndCartItem } from "../../store/shoppingcart";
import { getKey } from "../../store/maps";
import Autocomplete from "react-google-autocomplete";
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
	const [invalidAddyError, setInvalidAddyError] = useState("");
	const [validSubmit, setValidSubmit] = useState(false);
	const [validSubmitMinus, setValidSubmitMinus] = useState(false);
	const [validSubmitAdd, setValidSubmitAdd] = useState(false);

	const key = useSelector((state) => state.maps.key);

	useEffect(() => {
		dispatch(getUserCartItems());
		if (!key) {
			dispatch(getKey());
		}
	}, [dispatch, key]);

	if (!key) return null;

	// const updateAddress = (e) => setAddress(e.target.value);
	// const updateCity = (e) => setCity(e.target.value);
	// const updateState = (e) => setState(e.target.value);
	// const updateCountry = (e) => setCountry(e.target.value);

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
		if (cartValues.length < 1) {
			errors.cartItem = "You must have at least one item to checkout.";
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
						<div className="auto-complete-container2">
							<div
								id="res-address-create"
								htmlFor="auto-complete-box"
							>
								delivery address.
							</div>
							<Autocomplete
								id="auto-complete-box2"
								apiKey={key}
								onPlaceSelected={(place) => {
									if (place?.address_components) {
										setAddress(
											place?.address_components[0]
												?.short_name +
												" " +
												place?.address_components[1]
													?.short_name
										);
										place?.address_components.forEach(
											(component) => {
												if (
													component?.types[0] ===
													"locality"
												) {
													setCity(
														component?.short_name
													);
												}
												if (
													component?.types[0] ===
													"administrative_area_level_1"
												) {
													setState(
														component?.short_name
													);
												}
												if (
													component?.types[0] ===
													"country"
												) {
													setCountry(
														component?.short_name
													);
												}
											}
										);
									}
									if (!place?.address_components) {
										setInvalidAddyError(
											"Please enter a valid address!"
										);
									} else {
										setInvalidAddyError("");
									}
								}}
								options={{
									fields: ["ALL"],
									componentRestrictions: { country: "US" },
									types: ["address"],
								}}
							/>
							{invalidAddyError && (
								<p className="error-message-invalidAddy">
									⚠︎ {invalidAddyError}
								</p>
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

			{cartValues.length >= 1 ? (
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
			) : (
				<div className="cart-item-container-checkout2">
					<div id="add-items-txt">
						please add cart items to checkout.
						<button
							id="go-home-btn"
							onClick={(e) => {
								e.preventDefault();
								history.push("/");
							}}
						>
							go home
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default CheckoutPage;
