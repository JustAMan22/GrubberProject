import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./LoginForm.css";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		} else {
			closeModal();
		}
	};

	const demoLogin = () => {
		setEmail("demo@aa.io");
		setPassword("password");
	};

	return (
		<div className="login-modal-container">
			<form className="login-modal-form" onSubmit={handleSubmit}>
				{/* <div className="img-modal-container">
					<img
						className="home-logo-modal"
						src="https://cdn.discordapp.com/attachments/1115823811116400650/1164393415245582436/grubberLogo2.0-Gold.png"
						alt="grubber logo"
					/>
				</div> */}
				<div className="login-title-modal">login.</div>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="modal-login">
					<div>
						<span
							id="email-modal"
							className="material-symbols-outlined"
						>
							mail
						</span>
					</div>
					<input
						type="text"
						id="email-input"
						placeholder="enter your email."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="modal-password">
					<div>
						<i id="lock-modal" className="fa-solid fa-lock"></i>
					</div>
					<input
						type="password"
						id="password-input"
						placeholder="enter your password."
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="btn-container-modal">
					<button id="login-btn-modal" type="submit">
						log in
					</button>
					<button id="demo-button" onClick={demoLogin}>
						demo user login.
					</button>
				</div>
				<div className="no-account-register">
					<div id="not-member-text">not a member?</div>
					<div id="signup-btn-modal">
						<OpenModalButton
							className="register-button"
							buttonText="sign up."
							modalComponent={<SignupFormModal />}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default LoginFormModal;
