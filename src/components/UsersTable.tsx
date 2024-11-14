/** This file contains the logic for the Table used to display users on the dashboard. */

import { useContext } from "react";
import filterIcon from "../assets/images/filter-results-button.svg";
import { Link } from "react-router-dom";
import { UserTableContext } from "../pages/Dashboard/Users/Index";
import { User, UserTableCtx } from "../../types";
import deactivateUserIcon from "../assets/images/np_delete-friend_3248001_000000 1.svg";
import activateUserIcon from "../assets/images/np_user_2995993_000000 1.svg";
import viewUserIcon from "../assets/images/np_view_1214519_000000 1.svg";
import Filter, {
	DateFilter,
	EmailFilter,
	FilterButton,
	PhoneNumberFilter,
	StatusFilter,
	UsernameFilter,
} from "./Filters";
import changeUserStatus from "../utils/changeUserStatus";

/** Table for displaying users. */
const UsersTable = () => {
	const tableCtx = useContext(UserTableContext);
	const getDisplayLimit = (): [number, number] => {
		if (tableCtx) {
			const start =
				(tableCtx.state.currentPage - 1) * tableCtx.state.displayLimit;
			const end =
				tableCtx.state.currentPage * tableCtx.state.displayLimit;

			return [start, end];
		}

		return [0, 0];
	};

	return (
		<div className="users-table-container">
			<table>
				<TableHeader />
				<tbody>
					{tableCtx
						? tableCtx.state.searchResults
								.slice(...getDisplayLimit())
								.map((user) => (
									<TableRow key={user.id} user={user} />
								))
						: null}
				</tbody>
			</table>
		</div>
	);
};

/* Header for Table component. */
const TableHeader = () => {
	return (
		<thead>
			<tr>
				<td>
					<button>
						ORGANIZATION
						<img src={filterIcon} alt="Filter icon" />
					</button>{" "}
					<Filter />
				</td>
				<td>
					<button>
						USERNAME
						<img src={filterIcon} alt="Filter icon" />
					</button>{" "}
					<div className="filter">
						<UsernameFilter />
						<FilterButton />
					</div>
				</td>
				<td>
					<button>
						EMAIL
						<img src={filterIcon} alt="Filter icon" />
					</button>{" "}
					<div className="filter">
						<EmailFilter />
						<FilterButton />
					</div>
				</td>
				<td>
					<button>
						PHONE NUMBER
						<img src={filterIcon} alt="Filter icon" />
					</button>
					<div className="filter">
						<PhoneNumberFilter />
						<FilterButton />
					</div>
				</td>
				<td>
					<button>
						DATE JOINED
						<img src={filterIcon} alt="Filter icon" />
					</button>
					<div className="filter">
						<DateFilter />
						<FilterButton />
					</div>
				</td>
				<td>
					<button>
						STATUS
						<img src={filterIcon} alt="Filter icon" />
					</button>{" "}
					<div className="filter status-filter-wrapper">
						<StatusFilter />
						<FilterButton />
					</div>
				</td>
				<td></td>
			</tr>
		</thead>
	);
};

/** TableRow component for single row. */
const TableRow = ({ user }: { user: User }) => {
	const {dispatch, state} = useContext(UserTableContext) as UserTableCtx;
	return (
		<tr>
			<td>{user.personalInfo.organization}</td>
			<td>{user.personalInfo.name}</td>
			<td>{user.personalInfo.email}</td>
			<td>{user.personalInfo.phoneNumber}</td>
			<td>{user.personalInfo.dateJoined.toString()}</td>
			<td>
				<span data-status={user.personalInfo.status}>
					{user.personalInfo.status}
				</span>
			</td>
			<td>
				<button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20px"
						viewBox="0 -960 960 960"
						width="20px"
						fill="#545F7D"
					>
						<path d="M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z" />
					</svg>
				</button>
				<div>
					<Link to={`/dashboard/users/${user.id}`}>
						<img src={viewUserIcon} alt="View user icon" /> View
						Details
					</Link>
					{user.personalInfo.status !== "Blacklisted" &&
						user.personalInfo.status !== "Pending" && (
							<button onClick={() => changeUserStatus(user.id, 'Blacklisted', dispatch, state)} className="blacklist-btn">
								<img
									src={deactivateUserIcon}
									alt="Deactivate user icon"
								/>{" "}
								Blacklist User
							</button>
						)}
					{user.personalInfo.status !== "Active" && (
						<button onClick={() => changeUserStatus(user.id, 'Active', dispatch, state)} className="activate-btn">
							<img
								src={activateUserIcon}
								alt="Activate user icon"
							/>{" "}
							Activate User
						</button>
					)}
				</div>
			</td>
		</tr>
	);
};

export default UsersTable;
