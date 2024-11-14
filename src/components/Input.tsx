/** This file contains logic for the custom input component used in the LoginForm component. */

import { ForwardedRef, forwardRef, InputHTMLAttributes, useState } from "react";
import "../styles/components/Input.scss";

/** Custom input component. */
const Input = forwardRef(
	(
		{
			type,
			...otherProps
		}: InputHTMLAttributes<HTMLInputElement>,
		ref: ForwardedRef<HTMLInputElement>,
	) => {
		const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
		const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

		return (
			<div className="input-component">
				<input
					ref={ref}
					type={isPasswordVisible ? "text" : type}
					{...otherProps}
				/>
				{type === "password" && (
					<button
						onClick={togglePasswordVisibility}
						type="button"
						className="input-visibility-toggle-btn"
						title={
							isPasswordVisible
								? "Hide password"
								: "Show password"
						}
					>
						{isPasswordVisible ? "HIDE" : "SHOW"}
					</button>
				)}
			</div>
		);
	},
);

export default Input;
