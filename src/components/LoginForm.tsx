import { FormEvent, useRef, useState } from "react";
import Input from "./Input";
import { alert, toast } from "../utils/notifications-system";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
	const emailErrorMsg =
		"Invalid email format. Please enter a valid email address.";
	const passwordErrorMsg =
		"Password must be at least six (6) characters (at least one uppercase, one lowercase and one special character).";

	const validateForm = (): boolean => {
		if (!emailRegex.test(email))
			return emailRef.current?.focus(), toast.error(emailErrorMsg), false;
		if (!passwordRegex.test(password))
			return (
				passwordRef.current?.focus(),
				toast.error(passwordErrorMsg),
				false
			);

		return alert("Form is valid"), true;
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validateForm()) navigate('/dashboard')
	};

	return (
		<form onSubmit={handleSubmit} className="login-form">
			<div className="inputs-container">
				<Input
					ref={emailRef}
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					ref={passwordRef}
					placeholder="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<p className="forgot-password">
				<a onClick={() => alert("Sorry this feature is not available")}>
					FORGOT PASSWORD
				</a>
			</p>
			<button type="submit">LOG IN</button>
		</form>
	);
};

export default LoginForm;
