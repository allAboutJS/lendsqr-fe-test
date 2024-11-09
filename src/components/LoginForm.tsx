import { FormEvent, useRef, useState } from "react";
import Input from "./Input";

const LoginForm = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
	// const emailErrorMsg = "Invalid email. Please use a valid email.";
	// const passwordErrorMsg = "Password must contain at least one uppercase, one lowercase and one special character, and must be at least six (6) characters"

	const validateForm = (): boolean => {
		if (!emailRegex.test(email))
			return (
				emailRef.current?.focus(),
				false
			);
		if (!passwordRegex.test(password))
			return (
				passwordRef.current?.focus(),
				false
			);

		return true;
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validateForm()) {
		}
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
				<a href="/forgot-password">FORGOT PASSWORD</a>
			</p>
			<button type="submit">LOG IN</button>
		</form>
	);
};

export default LoginForm;
