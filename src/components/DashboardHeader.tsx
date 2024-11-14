/** This file contains the logic of the Dashboard's Header Component. */

import Logo from "./Logo";
import "../styles/components/DashboardHeader.scss";
import { Link } from "react-router-dom";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { alert } from "../utils/notificationsSystem";
import profileImg from "../assets/images/profile-image.png";

/** Header for Dashboard. */
const DashboardHeader = ({
	setIsMenuOpen,
}: {
	setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<header className="dashboard-header">
			<div>
				<button onClick={() => setIsMenuOpen(true)} title="Menu">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20px"
						viewBox="0 -960 960 960"
						width="20px"
						fill="#213f7d"
					>
						<path d="M144-264v-72h672v72H144Zm0-180v-72h672v72H144Zm0-180v-72h672v72H144Z" />
					</svg>
				</button>
				<Link to="/dashboard">
					<Logo />
				</Link>
			</div>
			<SearchBar />
			<NavBar />
		</header>
	);
};

/** Search bar component in Header. */
const SearchBar = () => {
	const [query, setQuery] = useState<string>("");
	const clearSearchQuery = () => setQuery("");
	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert("Sorry this feature is not available.", {
			onClose() {
				setQuery("");
			},
		});
	};

	return (
		<form onSubmit={handleSearch} className="search-bar" role="search">
			<div>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for anything"
				/>
				{query.length > 0 && (
					<button onClick={clearSearchQuery} type="button">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="20px"
							viewBox="0 -960 960 960"
							width="20px"
							fill="#aaaaaa"
						>
							<path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
						</svg>
					</button>
				)}
			</div>
			<button title="Search" type="submit">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#FFFFFF"
				>
					<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
				</svg>
			</button>
		</form>
	);
};

/** Navbar component in Header. */
const NavBar = () => {
	return (
		<nav className="nav" role="navigation">
			<div className="links">
				<a>Docs</a>
				<button
					onClick={() =>
						alert("Sorry this feature is not available.")
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#213f7d"
					>
						<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
					</svg>
				</button>
				<a title="Notifications">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="currentColor"
					>
						<path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-88h120v88q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
					</svg>
				</a>
			</div>
			<Profile />
		</nav>
	);
};

/** Current user profile icon in Dashboard Header. */
const Profile = () => {
	return (
		<div className="profile">
			<div>
				<img src={profileImg} alt="User profile image" />
			</div>
			<button>
				Adedeji{" "}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="currentColor"
				>
					<path d="M480-411.69 335.69-556h288.62L480-411.69Z" />
				</svg>
			</button>
		</div>
	);
};

export default DashboardHeader;
