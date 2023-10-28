import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-modal-container">
			<form className="signup-modal-form" onSubmit={handleSubmit}>
				<div id="sign-up-text">sign up.</div>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div>
					<div className="label-input">email</div>
					<div className="modal-login-2">
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
				</div>
				<div>
					<div className="label-input">password</div>
					<div className="modal-password-2">
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
				</div>
				<div>
					<div className="label-input">username</div>
					<div className="modal-login-2">
						<div>
							<div
								id="profile-circle-modal"
								className="material-symbols-outlined"
							>
								account_circle
							</div>
						</div>
						<input
							type="text"
							id="email-input"
							placeholder="enter your username."
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
				</div>
				<div>
					<div className="label-input"> confirm password</div>
					<div className="modal-password-2">
						<div>
							<i id="lock-modal" className="fa-solid fa-lock"></i>
						</div>
						<input
							type="password"
							id="password-input"
							placeholder="confirm your password."
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="btn-modal">
					<button className="signup-btn-modal-32" type="submit">
						sign up
					</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
