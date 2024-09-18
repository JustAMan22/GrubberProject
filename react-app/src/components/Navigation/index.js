import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import ShoppingCart from "./ShoppingCart";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { getAllRestaurants } from "../../store/restaurants";
// import SearchBar from "./SearchBar";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [name, setName] = useState("");
	const sessionUser = useSelector((state) => state.session.user);
	const restaurantsNav = useSelector((state) => state.restaurant);
	const restaurantsArr = Object.values(restaurantsNav);

	useEffect(() => {
		dispatch(getAllRestaurants());
	}, [dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name) history.push(`/`);
		else history.push(`/restaurants/search/${name}`);
		dispatch(getAllRestaurants());
	};

	// const dispatch = useDispatch();

	// const handleLogoClick = () => {
	// 	dispatch(getAllRestaurants());
	// };

	return (
		<div className="navbar-ul">
			<div className="home-button-navbar">
				<NavLink exact to="/">
					<img
						className="home-logo"
						src="https://imgur.com/f0YQGLa.png"
						alt="grubber logo"
						// onClick={handleLogoClick}
					/>
				</NavLink>
			</div>
			<div className="outter-search-bar-container">
				<form className="search-bar-form" onSubmit={handleSubmit}>
					<div id="search-bar-container">
						<div className="search-icon-container-mui">
							<button type="submit" id="search-submit-btn">
								<i
									id="search-bar-icon-mui"
									className="fa-solid fa-magnifying-glass"
								></i>
							</button>
						</div>
						<Autocomplete
							id="search-bar-box"
							options={restaurantsArr}
							getOptionLabel={(restaurant) => restaurant?.name}
							renderOption={(props, restaurant) => (
								<li className="li-search" {...props}>
									<div className="search-results-container">
										<div>
											<img
												id="search-img-results"
												src={
													restaurant?.preview_image
														? restaurant?.preview_image
														: "default-image-url.jpg"
												}
												alt={restaurant?.name}
											/>
										</div>
										<div className="search-results-info">
											<div id="search-results-name">
												{restaurant?.name}
											</div>
											<div id="search-results-address">
												{restaurant?.address},{" "}
												{restaurant?.city},{" "}
												{restaurant?.state}
											</div>
										</div>
									</div>
								</li>
							)}
							onChange={(event, restaurant) =>
								setName(restaurant ? restaurant.name : "")
							}
							onSelect={(e) => setName(e.target.value)}
							renderInput={(params) => (
								<TextField
									style={{ color: "white" }}
									className="query-box"
									size="small"
									variant="standard"
									{...params}
									placeholder="Find restaurants..."
								/>
							)}
						/>
					</div>
				</form>
			</div>
			{isLoaded && (
				<div className="profile-button-navbar">
					{isLoaded && sessionUser ? (
						<>
							<div className="welcome-user-msg-container">
								<span className="hi-user-msg-text">
									hello{" "}
									<span id="username-text">
										{sessionUser?.username}
									</span>
									,
								</span>
								<div className="welcomeback-msg-text">
									welcome back.
								</div>
							</div>
						</>
					) : (
						<div className="welcome-user-msg-container">
							<span className="hi-user-msg-text">
								hello <span id="username-text">Guest,</span>
							</span>
							<div className="welcomeback-msg-text">welcome.</div>
						</div>
					)}
					<div className="home-btn-container">
						<NavLink exact to="/">
							<i
								id="home-btn-mobile"
								className="fa-solid fa-house"
							></i>
						</NavLink>
					</div>
					<ProfileButton user={sessionUser} />
					<div>
						<ShoppingCart isLoaded={isLoaded} user={sessionUser} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;
