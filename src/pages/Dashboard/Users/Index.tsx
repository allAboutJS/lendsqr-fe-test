/** This file contains the logic for the Users page on the dashboard. */

import "../../../styles/DashboardUserLandingPage.scss";
import usersIcon from "../../../assets/images/icon (4).svg";
import activeUsersIcon from "../../../assets/images/icon (1).svg";
import usersWithSavingsICon from "../../../assets/images/icon (3).svg";
import usersWithLoanICon from "../../../assets/images/icon (2).svg";
import { createContext, useEffect, useReducer, useState } from "react";
import { User, UserTableCtx, UserTableState } from "../../../../types";
import loadUsers from "../../../utils/loadUsers";
import UsersDashboardOptimisticUi from "../../../components/UsersDashboardOptimisticUi";
import UsersTable from "../../../components/UsersTable";
import UserTablePagination from "../../../components/UserTablePagination";
import reducer from "../../../utils/reducer";

/** Context for storing and retrieve table state */
export const UserTableContext = createContext<UserTableCtx | null>(null);

/** Users page */
const IndexPage = () => {
	document.title = 'Dashboard - Users'

	const [users, setUsers] = useState<User[]>();
	const [activeUserCount, setActiveUserCount] = useState<number>();
	const [userswithLoanCount, setUserswithLoanCount] = useState<number>();
	const [userswithSavingsCount, setUserswithSavingsCount] =
		useState<number>();
	// Default state for filtering
	const defaultState: UserTableState = {
		filters: {
			organization: "",
			email: "",
			phoneNumber: "",
			status: "",
			username: "",
			date: "",
		},
		searchResults: [],
		users: [],
		currentPage: 1,
		totalPages: 1,
		displayLimit: 10,
	};

	const [state, dispatch] = useReducer(reducer, defaultState);

	useEffect(() => {
		// load users from cache or remote server
		loadUsers(setUsers);
	}, []);

	useEffect(() => {
		if (users) {
			// Set the search results to the entire users array
			// This will display all the users on initial render
			dispatch({ type: "SET_SEARCH_RESULTS", payload: users });
			dispatch({ type: "SET_USERS", payload: users });
			dispatch({
				type: "SET_TOTAL_PAGES",
				payload: Math.ceil(
					state.searchResults.length / defaultState.displayLimit,
				),
			});
		}
	}, [users]);

	useEffect(() => {
		if (state.users.length) {
			setActiveUserCount(
				state.users.filter(
					(user) => user.personalInfo.status === "Active",
				).length,
			);
			setUserswithLoanCount(
				state.users.filter((user) => user.hasLoan).length,
			);
			setUserswithSavingsCount(
				state.users.filter((user) => user.hasSavings).length,
			);
		}
	}, [state]);

	useEffect(
		() =>
			dispatch({
				type: "SET_TOTAL_PAGES",
				payload: Math.ceil(
					state.searchResults.length / defaultState.displayLimit,
				),
			}),
		[state.searchResults],
	);

	return (
		<UserTableContext.Provider value={{ state, dispatch }}>
			<div className="users-landing-page">
				<h1>Users</h1>
				{!users ? (
					<UsersDashboardOptimisticUi />
				) : (
					<>
						<div className="stats-container">
							<div className="stat">
								<img src={usersIcon} alt="Users icon" />
								<div>USERS</div>
								<div>{users.length}</div>
							</div>
							<div className="stat">
								<img
									src={activeUsersIcon}
									alt="Active users icon"
								/>
								<div>ACTIVE USERS</div>
								<div>{activeUserCount}</div>
							</div>
							<div className="stat">
								<img
									src={usersWithLoanICon}
									alt="Users with loan icon"
								/>
								<div>USERS WITH LOANS</div>
								<div>{userswithLoanCount}</div>
							</div>
							<div className="stat">
								<img
									src={usersWithSavingsICon}
									alt="Users with savings icon"
								/>
								<div>USERS WITH SAVINGS</div>
								<div>{userswithSavingsCount}</div>
							</div>
						</div>
						<UsersTable />
						<UserTablePagination
							currentPage={state.currentPage}
							dispatch={dispatch}
							displayLimit={
								state.currentPage === state.totalPages
									? state.searchResults.length -
										Math.floor(
											state.searchResults.length /
												state.displayLimit,
										) *
											state.displayLimit
									: state.displayLimit
							}
							totalUsers={state.searchResults.length}
							totalPages={state.totalPages}
						/>
					</>
				)}
			</div>
		</UserTableContext.Provider>
	);
};

export default IndexPage;
