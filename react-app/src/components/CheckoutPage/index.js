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
			errors.address = "Street address is required";
		}
		if (!city) {
			errors.city = "City is required";
		}
		if (!state) {
			errors.state = "State is required";
		}
		if (!country) {
			errors.country = "Country is required";
		}
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setValidSubmit(true);
            for (const cartItem of Object.values(cartItems)) {
                try {
                    const deletedCartItem = await dispatch(deleteCartItem(cartItem?.id));
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
		<section className="checkout-page-container">
			<div className="checkout-form">
				<form
					onSubmit={handleOrderPlacement}
					className="checkout-page-address-form"
				>
					{errors.address && (
						<p className="error-message">{errors.address}</p>
					)}
					<div className="form-group">
						<label htmlFor="address">Address</label>
						<input
							type="text"
							id="address"
							placeholder="Enter address"
							value={address}
							onChange={updateAddress}
							className={`input-field ${
								errors.address ? "error" : ""
							}`}
						/>
						{errors.city && (
							<p className="error-message">{errors.city}</p>
						)}
						<div className="form-group">
							<label htmlFor="city">City</label>
							<input
								type="text"
								id="city"
								placeholder="Enter city"
								value={city}
								onChange={updateCity}
								className={`input-field ${
									errors.city ? "error" : ""
								}`}
							/>
						</div>
					</div>
					{errors.state && (
						<p className="error-message">{errors.state}</p>
					)}
					<div className="form-group">
						<label htmlFor="state">State</label>
						<input
							type="text"
							id="state"
							placeholder="Enter state"
							value={state}
							onChange={updateState}
							className={`input-field ${
								errors.state ? "error" : ""
							}`}
						/>
					</div>
					{errors.country && (
						<p className="error-message">{errors.country}</p>
					)}
					<div className="form-group">
						<label htmlFor="country">Country</label>
						<input
							type="text"
							id="country"
							placeholder="Enter country"
							value={country}
							onChange={updateCountry}
							className={`input-field ${
								errors.country ? "error" : ""
							}`}
						/>
					</div>
					<div className="place-order-button-div">
						<button
							type="submit"
							className="place-order-button"
							disabled={validSubmit}
						>
							Place Order!
						</button>
					</div>
				</form>
			</div>

			<div className="checkout-cart-items">
				<div className="cart-item-container">
					{Object?.values(cartItems)?.map((cartItem) => (
						<div key={cartItem.id} className="indv-cart-items">
							<div>
								{cartItem?.menu_item?.name}
								<div>
									<button
										disabled={validSubmitMinus}
										onClick={(e) =>
											updateQuantitySubtract(
												e,
												cartItem?.menu_item?.id,
												cartItem?.menu_item
													?.restaurant_id,
												cartItem?.quantity
											)
										}
									>
										-
									</button>
									{cartItem?.quantity}{" "}
									<button
										disabled={validSubmitAdd}
										onClick={(e) =>
											updateQuantityAdd(
												e,
												cartItem?.menu_item?.id,
												cartItem?.menu_item
													?.restaurant_id,
												cartItem?.quantity
											)
										}
									>
										+
									</button>
								</div>
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
				</div>
			</div>
		</section>
	);
}

export default CheckoutPage;
