import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRestaurant } from "../../store/restaurants";
import "./CreateRestaurant.css";

const CreateRestaurantPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [description, setDescription] = useState("");
	const [price_range, setPriceRange] = useState();
	const [preview_image, setPreviewImage] = useState("");
	const [errors, setErrors] = useState({});
	const [validSubmit, setValidSubmit] = useState(false);

	const updateName = (e) => setName(e.target.value);
	const updateAddress = (e) => setAddress(e.target.value);
	const updateCity = (e) => setCity(e.target.value);
	const updateState = (e) => setState(e.target.value);
	const updateCountry = (e) => setCountry(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updatePriceRange = (e) => setPriceRange(parseInt(e.target.value));
	const updatePreviewImage = (e) => {
		const selectedImage = e.target.files[0];

		if (selectedImage) {
			const reader = new FileReader();

			if (
				!selectedImage.type.match(/^image\/(png|jpe?g)$/i) ||
				!selectedImage.name
			) {
				setErrors((prevErrors) => ({
					...prevErrors,
					preview_image: "Image must be in PNG, JPEG, or JPG format!",
				}));
			} else {
				reader.onload = (event) => {
					const dataURL = event.target.result;
					setPreviewImage(dataURL);
					setErrors((prevErrors) => ({
						...prevErrors,
						preview_image: "",
					}));
				};

				reader.readAsDataURL(selectedImage);
			}
		}
	};

	const handleNewRestaurant = async (e) => {
		e.preventDefault();

		const errors = {};
		if (!name) {
			errors.name = "name is required!";
		}
		if (name.length >= 40) {
			errors.name = "name must be less than 40 characters!";
		}
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
		if (!description) {
			errors.description = "description is required!";
		}
		if (description.length >= 120) {
			errors.description = "country must be less than 120 characters!";
		}
		if (!price_range) {
			errors.price_range = "price range is required!";
		}
		if (!preview_image.length) {
			errors.preview_image = "preview image is required!";
		}
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setValidSubmit(true);

			const restaurantDataPayload = {
				name,
				address,
				city,
				state,
				country,
				description,
				price_range,
				preview_image,
			};

			try {
				const createdRestaurant = await dispatch(
					createRestaurant(restaurantDataPayload)
				);
				if (createdRestaurant && createdRestaurant.id) {
					history.push(`/restaurants/${createdRestaurant.id}`);
				}
			} catch (error) {
				console.error("Restaurant creation failed:", error);
			}
			setValidSubmit(false);
		}
	};

	return (
		<div className="create-restaurant-container">
			<div className="form-container">
				<div className="form-heading">
					tell us about your restaurant.
				</div>
				<form
					onSubmit={handleNewRestaurant}
					className="create-restaurant-form"
				>
					<div className="grid-form-container">
						<div className="form-group">
							<div className="restaurantName">name</div>
							<input
								type="text"
								id="restaurantName"
								placeholder="enter your restaurant's name."
								value={name}
								onChange={updateName}
								className={`input-field ${
									errors.name ? "error" : ""
								}`}
							/>
							{errors.name && (
								<div className="error-message-container">
									<span className="error-message-text">
										⚠︎ {errors.name}
									</span>
								</div>
							)}
						</div>

						<div className="form-group">
							<div className="restaurantName">price range</div>
							<select
								onChange={updatePriceRange}
								id="price-range-select"
								className={`input-field ${
									errors.price_range ? "error" : ""
								}`}
								required
							>
								<option value="0">select a price range.</option>
								<option value="1">$</option>
								<option value="2">$$</option>
								<option value="3">$$$</option>
								<option value="4">$$$$</option>
							</select>
							{errors.price_range && (
								<div className="error-message-container">
									<span className="error-message-text">
										⚠︎ {errors.price_range}
									</span>
								</div>
							)}
						</div>

						<div className="form-group">
							<div className="restaurantName">address</div>
							<input
								type="text"
								id="address"
								placeholder="enter your restaurant's address"
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
							<div className="restaurantName">city</div>
							<input
								type="text"
								id="city"
								placeholder="enter your restaurant's city."
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
							<div className="restaurantName">state</div>
							<input
								type="text"
								id="state"
								placeholder="enter your restaurant's state."
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
							<div className="restaurantName">country</div>
							<input
								type="text"
								id="country"
								placeholder="enter your restaurant's country."
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
					<div className="desc-container">
						<div className="restaurantName">description</div>
						<textarea
							type="text"
							id="desc-textarea"
							placeholder="enter your description"
							value={description}
							onChange={updateDescription}
							className={`input-field ${
								errors.description ? "error" : ""
							}`}
						/>
						{errors.description && (
							<div className="error-message-container">
								<span className="error-message-text">
									⚠︎ {errors.description}
								</span>
							</div>
						)}
					</div>

					<div className="publish-and-upload-container">
						<div className="image-upload-input-container">
							<div>
								<input
									type="file"
									accept="image/png, image/jpeg, image/jpg"
									id="upload-photo"
									onChange={updatePreviewImage}
									className={`input-field ${
										errors.preview_image ? "error" : ""
									}`}
								/>
								{errors.preview_image && (
									<div className="error-message-container">
										<span className="error-message-text">
											⚠︎ {errors.preview_image}
										</span>
									</div>
								)}
							</div>
						</div>
						<div className="create-res-btn-container">
							<button
								id="publish-res-button"
								type="submit"
								className="create-restaurant-btn"
								disabled={validSubmit}
							>
								publish restaurant
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateRestaurantPage;
