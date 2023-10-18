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
	const [price_range, setPriceRange] = useState();
	const [preview_image, setPreviewImage] = useState("");
	const [errors, setErrors] = useState({});
	const [validSubmit, setValidSubmit] = useState(false);

	const updateName = (e) => setName(e.target.value);
	const updateAddress = (e) => setAddress(e.target.value);
	const updateCity = (e) => setCity(e.target.value);
	const updateState = (e) => setState(e.target.value);
	const updateCountry = (e) => setCountry(e.target.value);
	const updatePriceRange = (e) => setPriceRange(e.target.value);
	const updatePreviewImage = (e) => {
		const selectedImage = e.target.files[0];

		if (selectedImage) {
			// Check if the file type is an image (PNG, JPEG, or JPG)
			if (
				!selectedImage.type.match(/^image\/(png|jpe?g)$/i) ||
				!selectedImage.name
			) {
				setErrors({
					...errors,
					preview_image: "Image must be in PNG, JPEG, or JPG format!",
				});
				return; // Exit early if the file is not valid
			}

			// Create a blob URL for the selected image
			const objectURL = URL.createObjectURL(selectedImage);

			setPreviewImage(objectURL);
			setErrors({
				...errors,
				preview_image: "", // Clear the error message if the file is valid
			});
		}
	};

	const handleNewRestaurant = async (e) => {
		e.preventDefault();

		const errors = {};
		if (!name) {
			errors.name = "Name is required";
		}
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
		if (!price_range) {
			errors.price_range = "Price range is required";
		}
		if (!preview_image.length) {
			errors.preview_image = "Preview image is required";
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
		<section className="create-restaurant-container">
			<h2 className="form-heading">Add the Name of your Restaurant</h2>
			<form
				onSubmit={handleNewRestaurant}
				className="create-restaurant-form"
			>
				<div className="form-group">
					<label htmlFor="restaurantName">
						Name of your Restaurant
					</label>
					<input
						type="text"
						id="restaurantName"
						placeholder="Enter restaurant name"
						value={name}
						onChange={updateName}
						className={`input-field ${errors.name ? "error" : ""}`}
					/>
					{errors.name && (
						<p className="error-message">{errors.name}</p>
					)}
				</div>
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
						{errors.city && (
							<p className="error-message">{errors.city}</p>
						)}
					</div>
					{errors.address && (
						<p className="error-message">{errors.address}</p>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="state">State</label>
					<input
						type="text"
						id="state"
						placeholder="Enter state"
						value={state}
						onChange={updateState}
						className={`input-field ${errors.state ? "error" : ""}`}
					/>
					{errors.state && (
						<p className="error-message">{errors.state}</p>
					)}
				</div>
				<h2 className="form-heading">
					Update your Restaurant's Address
				</h2>
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
					{errors.country && (
						<p className="error-message">{errors.country}</p>
					)}
				</div>
				<h2 className="form-heading">Set an Average Cost per Person</h2>
				<div className="form-group">
					<select
						onChange={updatePriceRange}
						className="input-field"
						required
					>
						<option value="0">Price</option>
						<option value="1">$</option>
						<option value="2">$$</option>
						<option value="3">$$$</option>
						<option value="4">$$$$</option>
					</select>
					{errors.price_range && (
						<p className="error-message">{errors.price_range}</p>
					)}
				</div>

				<h2 className="form-heading">
					Add A Preview Photo of your Restaurant
				</h2>
				{errors.preview_image && (
					<p className="error-message">{errors.preview_image}</p>
				)}
				<input
					type="file"
					accept="image/png, image/jpeg, image/jpg"
					id="upload-photo"
					onChange={updatePreviewImage}
					className={`input-field ${
						errors.preview_image ? "error" : ""
					}`}
				/>

				<button
					type="submit"
					className="create-restaurant-btn"
					disabled={validSubmit}
				>
					Publish Restaurant
				</button>
			</form>
		</section>
	);
};

export default CreateRestaurantPage;
