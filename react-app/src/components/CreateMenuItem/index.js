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
          preview_image: "Image must be in PNG, JPEG, or JPG format!",
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
      errors.name = "Name is required";
    }
    if (!description) {
      errors.description = "Description address is required";
    }
    if (!price) {
      errors.price_ = "Price is required";
    }
    if (!preview_image.length) {
      errors.preview_image = "Preview image is required";
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
    <section className="create-menu-item-container">
      <h2 className="form-heading">enter your menu item info below.</h2>
      <form onSubmit={handleNewMenuItem} className="create-restaurant-form">
        <div className="form-group">
          <label htmlFor="restaurantName">Name your menu item.</label>
          <input
            type="text"
            id="restaurantName"
            placeholder="Enter menu item name"
            value={name}
            onChange={updateName}
            className={`input-field ${errors.name ? "error" : ""}`}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Description</label>
          <input
            type="text"
            id="address"
            placeholder="Enter description"
            value={description}
            onChange={updateDescription}
            className={`input-field ${errors.description ? "error" : ""}`}
          />
          <div className="form-group">
            <label htmlFor="city">Price</label>
            <input
              type="number"
              id="city"
              placeholder="Enter price"
              value={price}
              onChange={updatePrice}
              className={`input-field ${errors.price ? "error" : ""}`}
            />
            {errors.price && <p className="error-message">{errors.price}</p>}
          </div>
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>
        <h2 className="form-heading">Add A Preview Photo of your item</h2>
        {errors.preview_image && (
          <p className="error-message">{errors.preview_image}</p>
        )}
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="upload-photo"
          onChange={updatePreviewImage}
          className={`input-field ${errors.preview_image ? "error" : ""}`}
        />

        <button
          type="submit"
          className="create-restaurant-btn"
          disabled={validSubmit}
        >
          Add menu item.
        </button>
      </form>
    </section>
  );
};

export default CreateMenuItemPage;
