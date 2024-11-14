import { Link } from "react-router-dom";
import '../styles/404.scss'

const NotFound = () => {
	document.title = "Error 404 - Not Found";

	return (
		<div className="error-404">
			<h1>404 ERROR</h1>
			<p>The page you're trying to access is unavailable</p>
			<Link to='/dashboard/users'>GO TO HOME</Link>
		</div>
	);
};

export default NotFound;
