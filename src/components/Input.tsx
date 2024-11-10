import { ForwardedRef, forwardRef, InputHTMLAttributes, useState } from "react";
import "../styles/components/Input.scss";

const Input = forwardRef(({ className, type, ...otherProps }: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const togglePasswordVisibility = () =>
		setIsPasswordVisible(!isPasswordVisible);

	return (
		<div className="input-component">
			<input ref={ref} type={isPasswordVisible ? "text" : type} {...otherProps} />
			{type === "password" && (
				<button
					onClick={togglePasswordVisibility}
					type="button"
					className="input-visibility-toggle-btn"
					title={
						isPasswordVisible ? "Hide password" : "Show password"
					}
				>
					{isPasswordVisible ? "HIDE" : "SHOW"}
				</button>
			)}
		</div>
	);
});

export default Input;
