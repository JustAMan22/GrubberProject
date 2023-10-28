import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./CreateMenuItem.css";
import { createMenuItem } from "../../store/menuitems";

const CreateMenuItemPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { restaurantId } = useParams();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [preview_image, setPreviewImage] = useState("");
	const [errors, setErrors] = useState({});
	const [validSubmit, setValidSubmit] = useState(false);

	const updateName = (e) => setName(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updatePrice = (e) => setPrice(e.target.value);
	const updatePreviewImage = (e) => {
		const selectedImage = e.target.files[0];

		if (selectedImage) {
			const reader = new FileReader();

			if (
				!selectedImage.type.match(/^image\/(png|jpe?g)$/i) ||
				!selectedImage.name
			) {
				setErrors({
					...errors,
					preview_image: "image must be in PNG, JPEG, or JPG format!",
				});
			} else {
				reader.onload = (event) => {
					const dataURL = event.target.result;
					setPreviewImage(dataURL);
					setErrors({
						...errors,
						preview_image: "",
					});
				};

				reader.readAsDataURL(selectedImage);
			}
		}
	};

	const handleNewMenuItem = async (e) => {
		e.preventDefault();

		const errors = {};
		if (!name) {
			errors.name = "name is required!";
		}
		if (name?.length > 25) {
			errors.name = "name must be 25 characters or less!";
		}
		if (!description) {
			errors.description = "description is required!";
		}
		if (description?.length > 45) {
			errors.description = "description must be 45 characters or less!";
		}
		if (!price) {
			errors.price = "price is required!";
		}
		if (price > 10000) {
			errors.price = "price must be 10,000 or less!";
		}
		if (!preview_image.length) {
			errors.preview_image = "preview image is required!";
		}
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setValidSubmit(true);

			const menuItemDataPayload = {
				name,
				description,
				price,
				preview_image,
			};

			try {
				const createdMenuItem = await dispatch(
					createMenuItem(restaurantId, menuItemDataPayload)
				);
				if (createdMenuItem) {
					history.push(`/restaurants/${restaurantId}`);
				}
			} catch (error) {
				console.error("Restaurant creation failed:", error);
			}
			setValidSubmit(false);
		}
	};

	return (
		<div className="create-menu-item-container">
			<div className="menu-item-container">
				<div id="menu-item-title">tell us about your menu item.</div>
				<form
					onSubmit={handleNewMenuItem}
					className="create-menu-item-form"
				>
					<div className="input-fields-container">
						<div className="price-name-container">
							<div className="menu-item-form">
								<div className="name-menu">name</div>
								<input
									type="text"
									id="menu-item-name"
									placeholder="enter your menu item's name"
									value={name}
									onChange={updateName}
									className={`input-field-menu ${
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
							<div className="menu-item-form">
								<div className="price-menu">price</div>
								<input
									type="number"
									id="price-menu"
									placeholder="enter your menu item's price"
									value={price}
									onChange={updatePrice}
									className={`input-field-menu ${
										errors.price ? "error" : ""
									}`}
								/>
								{errors.price && (
									<div className="error-message-container">
										<span className="error-message-text">
											⚠︎ {errors.price}
										</span>
									</div>
								)}
							</div>
						</div>
						<div className="menu-item-form-desc-container">
							<div className="description-menu">description</div>
							<textarea
								type="text"
								id="description-menu-input"
								placeholder="type your menu item's description here..."
								value={description}
								onChange={updateDescription}
								className={`input-field-menu ${
									errors.description ? "error" : ""
								}`}
							/>
							{errors.description && (
								<div
									id="menu-desc-error"
									className="error-message-container"
								>
									<span className="error-message-text">
										⚠︎ {errors.description}
									</span>
								</div>
							)}
							<div className="image-upload-container">
								<input
									type="file"
									accept="image/png, image/jpeg, image/jpg"
									id="upload-photo-menu"
									onChange={updatePreviewImage}
									className={`input-field-menu ${
										errors.preview_image ? "error" : ""
									}`}
								/>
								{errors.preview_image && (
									<div
										className="error-message-container"
										id="preview-image-error-text-menu"
									>
										<span className="error-message-text">
											⚠︎ {errors.preview_image}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="button-photo-container">
						<div className="menu-item-btn-container">
							<button
								type="submit"
								className="publish-menu-item-btn"
								disabled={validSubmit}
							>
								publish menu item.
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateMenuItemPage;
