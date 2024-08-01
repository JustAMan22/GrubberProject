import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { getUserCart } from "../../store/shoppingcart";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	// const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const [currentDateTime, setCurrentDateTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDateTime(new Date());
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	function getFormattedDate(date) {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return date.toLocaleDateString(undefined, options);
	}

	function getFormattedTime(date) {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		const amOrPm = hours >= 12 ? "PM" : "AM";
		const formattedHours = hours % 12 || 12;

		return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes}:${
			seconds < 10 ? "0" : ""
		}${seconds} ${amOrPm}`;
	}

	function setActiveClass(e) {
		const ulDiv = document.getElementsByClassName("profile-dropdown")[0];
		const ulClasses = ulDiv.classList;
		e.preventDefault();
		ulClasses.toggle("hidden");
	}

	// const openMenu = () => {
	// 	if (showMenu) return;
	// 	setShowMenu(true);
	// };

	// useEffect(() => {
	// 	if (!showMenu) return;

	// 	const closeMenu = (e) => {
	// 		if (!ulRef.current.contains(e.target)) {
	// 			setShowMenu(false);
	// 		}
	// 	};

	// 	document.addEventListener("click", closeMenu);

	// 	return () => document.removeEventListener("click", closeMenu);
	// }, [showMenu]);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		dispatch(getUserCart());
		history.push("/");
	};

	// const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
	// const closeMenu = () => setShowMenu(false);

	return (
		<>
			<button className="profile-button" onClick={setActiveClass}>
				<span
					className="material-symbols-outlined"
					id="profile-button-id"
				>
					person
				</span>
			</button>
			<ul className="profile-dropdown hidden" ref={ulRef}>
				{user ? (
					<div className="profile-all-txt-container">
						<div className="name-date-container">
							<i
								id="profile-icon-user-section"
								className="fa-regular fa-user"
							></i>
							{/* <span id="profile-hello-text">hello, </span> */}
							<span className="username-profile-btn-txt">
								{user.username}
							</span>
							<div className="date-time-container">
								<span className="date-nav">
									{getFormattedDate(currentDateTime)}
								</span>
								<span className="time-nav">
									{getFormattedTime(currentDateTime)}
								</span>
							</div>
						</div>
						<div
							className="create-res-btn"
							onClick={() => history.push("/")}
						>
							<i id="plus-sign" class="fa-solid fa-house"></i>
							<span id="create-res-res-btn">go to home</span>
						</div>
						<div
							className="create-res-btn"
							onClick={() => history.push("/restaurants/create")}
						>
							<i
								id="plus-sign"
								className="fa-solid fa-utensils"
							></i>
							<span id="create-new-txt">create a new</span>{" "}
							<span id="create-res-res-btn">restaurant</span>
						</div>
						<div className="logout-btn-container">
							<button
								id="logout-btn-profile"
								className="logout-modal-button"
								onClick={handleLogout}
							>
								log out
								<span
									id="logout-icon"
									className="material-symbols-outlined"
								>
									logout
								</span>
							</button>
						</div>
					</div>
				) : (
					<div className="modal-btns-container-profile">
						<span className="hey-there-text">welcome.</span>
						<OpenModalButton
							buttonText="Log In"
							// onItemClick={setActiveClass}
							modalComponent={<LoginFormModal />}
						/>

						<OpenModalButton
							id="sign-up-btn-modal"
							buttonText="Sign Up"
							// onItemClick={setActiveClass}
							modalComponent={<SignupFormModal />}
						/>
					</div>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
