import Logo from "../components/Logo";
import bannerImg from "../assets/images/login-banner-img.png";
import "../styles/Login.scss";
import LoginForm from "../components/LoginForm";

const Login = () => {
	return (
		<div className="login-page">
			<aside>
				<div className="logo-container">
					<Logo />
				</div>
				<div className="img-banner">
					<img
						src={bannerImg}
						alt="Animated man walking through door"
					/>
				</div>
			</aside>
			<main>
				<div className="logo-container">
					<Logo width={100} />
				</div>
				<div className="login-form-container">
					<div>
						<h1>Welcome!</h1>
						<p>Enter details to login.</p>
					</div>
					<LoginForm />
				</div>
			</main>
		</div>
	);
};

export default Login;
