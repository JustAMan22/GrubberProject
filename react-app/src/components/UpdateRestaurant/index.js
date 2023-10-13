import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllRestaurants, updateRestaurant } from "../../store/restaurants";
import UnauthorizedPage from "../ErrorPage";
import "./UpdateRestaurant.css";

const UpdateRestaurantPage = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const history = useHistory();
  const restaurantData = useSelector((state) => state.restaurant);
  const currentUser = useSelector((state) => state.session.user);
  const restaurant = useMemo(() => {
    return restaurantData ? restaurantData[restaurantId] : null;
  }, [restaurantData, restaurantId]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [price_range, setPriceRange] = useState("");
  const [preview_image, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});
  const [validSubmit, setValidSubmit] = useState(false);

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (restaurant && currentUser) {
      setName(restaurant.name);
      setAddress(restaurant.address);
      setCity(restaurant.city);
      setState(restaurant.state);
      setCountry(restaurant.country);
      setPriceRange(restaurant.price_range);
      setPreviewImage(restaurant.preview_image);
    }

  }, [restaurant, currentUser]);

  if (restaurant && currentUser?.id !== restaurant?.user_id) {
    return <UnauthorizedPage />;
  }


  const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updatePriceRange = (e) => setPriceRange(e.target.value);

  const updatePreviewImage = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();

      if (!selectedImage.type.match(/^image\/(png|jpe?g)$/i)) {
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

  const handleUpdateRestaurant = async (e) => {
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
        const updatedRestaurant = await dispatch(
          updateRestaurant(restaurantId, restaurantDataPayload)
        );
        if (updatedRestaurant.ok) {
          await dispatch(getAllRestaurants());
          history.push(`/restaurants/${restaurantId}`);
        }
      } catch (error) {
        console.error("Error creating review:", error);
        if (error instanceof Response) {
          const responseJson = await error.json();
          console.error("Server response:", responseJson);
        }
      }
    }
  };

  return (
    <>
      {restaurant && (
        <section className="update-restaurant-container">
          <h2 className="form-heading">Add the Name of your Restaurant</h2>
          <form
            onSubmit={handleUpdateRestaurant}
            className="create-restaurant-form"
          >
            <div className="form-group">
              <label htmlFor="restaurantName">Name of your Restaurant</label>
              <input
                type="text"
                id="restaurantName"
                placeholder="Enter restaurant name"
                value={name}
                onChange={updateName}
                className={`input-field ${errors.name ? "error" : ""}`}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={updateAddress}
                className={`input-field ${errors.address ? "error" : ""}`}
              />
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter city"
                  value={city}
                  onChange={updateCity}
                  className={`input-field ${errors.city ? "error" : ""}`}
                />
                {errors.city && <p className="error-message">{errors.city}</p>}
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
              {errors.state && <p className="error-message">{errors.state}</p>}
            </div>
            <h2 className="form-heading">Update your Restaurant's Address</h2>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                placeholder="Enter country"
                value={country}
                onChange={updateCountry}
                className={`input-field ${errors.country ? "error" : ""}`}
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
                <option value="0">
                  {restaurant?.price_range === 4
                    ? "$$$$"
                    : restaurant?.price_range === 3
                    ? "$$$"
                    : restaurant?.price_range === 2
                    ? "$$"
                    : restaurant?.price_range === 1
                    ? "$"
                    : null}
                </option>
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
              className={`input-field ${errors.preview_image ? "error" : ""}`}
            />

            <button
              type="submit"
              className="create-restaurant-btn"
              disabled={validSubmit}
            >
              Edit Restaurant
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default UpdateRestaurantPage;
