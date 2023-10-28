import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import ShoppingCart from "./ShoppingCart";
// import SearchBar from "./SearchBar";
// import { getAllRestaurants } from "../../store/restaurants";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	// const dispatch = useDispatch();

	// const handleLogoClick = () => {
	// 	dispatch(getAllRestaurants());
	// };

	return (
		<ul className="navbar-ul">
			<li className="home-button-navbar">
				<NavLink exact to="/">
					<img
						className="home-logo"
						src="https://cdn.discordapp.com/attachments/1115823811116400650/1164393415245582436/grubberLogo2.0-Gold.png"
						alt="grubber logo"
						// onClick={handleLogoClick}
					/>
				</NavLink>
			</li>
			{/* <div id="search-bar-container">
				<SearchBar />
			</div> */}
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
					<ProfileButton user={sessionUser} />
					<div>
						<ShoppingCart isLoaded={isLoaded} user={sessionUser} />
					</div>
				</div>
			)}
		</ul>
	);
}

export default Navigation;
