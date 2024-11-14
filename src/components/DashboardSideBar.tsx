/* This file contains the logic of the SideBar of the Dashboard. */

import { Link, useLocation } from "react-router-dom";
import "../styles/components/DashboardSideBar.scss";
import briefCase from "../assets/images/briefcase 1.svg";
import usersIcon from "../assets/images/user-friends 1.svg";
import guarantorIcon from "../assets/images/users 1.svg";
import loansIcon from "../assets/images/sack 1.svg";
import decisionModelsIcon from "../assets/images/handshake-regular 1.svg";
import savingsIcon from "../assets/images/piggy-bank 1.svg";
import loanRequestsIcon from "../assets/images/Group 104.svg";
import whitelistIcon from "../assets/images/user-check 1.svg";
import karmaIcon from "../assets/images/user-times 1.svg";
import savingsProductsIcon from "../assets/images/np_bank_148501_000000 1.svg";
import feesandChargesIcon from "../assets/images/coins-solid 1.svg";
import transactionsIcon from "../assets/images/icon.svg";
import servicesIcon from "../assets/images/galaxy 1.svg";
import servicesAccountIcon from "../assets/images/user-cog 1.svg";
import settlementsIcon from "../assets/images/scroll 1.svg";
import reportsIcon from "../assets/images/chart-bar 2.svg";
import preferencesIcon from "../assets/images/sliders-h 1.svg";
import feesAndPricingIcon from "../assets/images/badge-percent 1.svg";
import auditLogsIcon from "../assets/images/clipboard-list 1.svg";
import homeIcon from "../assets/images/home 1.svg";
import { Dispatch, SetStateAction } from "react";

/** Side nav menu data structure. */
const menu = {
	CUSTOMERS: [
		{
			path: "/dashboard/users",
			icon: usersIcon,
			label: "Users",
		},
		{
			path: "/dashboard/guarantors",
			icon: guarantorIcon,
			label: "Guarantors",
		},
		{
			path: "/dashboard/loans",
			icon: loansIcon,
			label: "Loans",
		},
		{
			path: "/dashboard/decision-models",
			icon: decisionModelsIcon,
			label: "Decision Models",
		},
		{
			path: "/dashboard/savings",
			icon: savingsIcon,
			label: "Savings",
		},
		{
			path: "/dashboard/loan-requests",
			icon: loanRequestsIcon,
			label: "Loan Requests",
		},
		{
			path: "/dashboard/whitelist",
			icon: whitelistIcon,
			label: "Whitelist",
		},
		{
			path: "/dashboard/karma",
			icon: karmaIcon,
			label: "Karma",
		},
	],
	BUSINESSES: [
		{
			path: "/dashboard/organization",
			icon: briefCase,
			label: "Organization",
		},
		{
			path: "/dashboard/loan-products",
			icon: loanRequestsIcon,
			label: "Loan Products",
		},
		{
			path: "/dashboard/savings-products",
			icon: savingsProductsIcon,
			label: "Savings Products",
		},
		{
			path: "/dashboard/fees-and-charges",
			icon: feesandChargesIcon,
			label: "Fees and Charges",
		},
		{
			path: "/dashboard/transactions",
			icon: transactionsIcon,
			label: "Transactions",
		},
		{
			path: "/dashboard/services",
			icon: servicesIcon,
			label: "Services",
		},
		{
			path: "/dashboard/service-account",
			icon: servicesAccountIcon,
			label: "Service Account",
		},
		{
			path: "/dashboard/settlements",
			icon: settlementsIcon,
			label: "Settlements",
		},
		{
			path: "/dashboard/reports",
			icon: reportsIcon,
			label: "Reports",
		},
	],
	SETTINGS: [
		{
			path: "/dashboard/preferences",
			icon: preferencesIcon,
			label: "Preferences",
		},
		{
			path: "/dashboard/fees-and-prices",
			icon: feesAndPricingIcon,
			label: "Fees and Pricing",
		},
		{
			path: "/dashboard/audit-and-logs",
			icon: auditLogsIcon,
			label: "Audit Logs",
		},
	],
};

/** Side bar component that contains the actual menu. */
const DashboardSideBar = ({
	setIsMenuOpen,
	isMenuOpen,
}: {
	setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
	isMenuOpen: boolean;
}) => {
	const { pathname } = useLocation();
	const closeMenuBar = () => setIsMenuOpen(false);

	return (
		<nav role="navigation" className="sidebar-nav">
			{isMenuOpen && (
				<button
					onClick={closeMenuBar}
					className="menu-close-btn"
					title="Close menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20px"
						viewBox="0 -960 960 960"
						width="20px"
						fill="#213f7d"
					>
						<path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
					</svg>
				</button>
			)}
			<div className="organization-dropdown">
				<button>
					<img src={briefCase} alt="Organization icon" /> Switch
					Organization{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20px"
						viewBox="0 -960 960 960"
						width="20px"
						fill="currentColor"
					>
						<path d="M480-333 240-573l51-51 189 189 189-189 51 51-240 240Z" />
					</svg>
				</button>
				<ul>
					<li>LendsQR</li>
				</ul>
			</div>
			<div className="dashboard-icon">
				<img src={homeIcon} alt="Dashboard icon" /> Dashboard
			</div>
			{Object.entries(menu).map(([key, section]) => (
				<div className="menu-section" key={key}>
					<div className="section-heading">{key}</div>
					{section.map((option, index) => (
						<Link
							onClick={closeMenuBar}
							to={option.path}
							data-active={pathname.includes(option.path)}
							className="nav-link"
							key={index}
						>
							<img
								src={option.icon}
								alt={`${option.label} icon`}
							/>
							<span>{option.label}</span>
						</Link>
					))}
				</div>
			))}
		</nav>
	);
};

export default DashboardSideBar;
