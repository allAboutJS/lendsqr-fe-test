/** This file contains the logic for the various filters available on the UserTable. */

import { UserTableCtx } from "../../types";
import useUsers from "../hooks/useUsers";
import "../styles/components/Filters.scss";
import { UserTableContext } from "../pages/Dashboard/Users/Index";
import { useContext } from "react";
import Input from "./Input";
import filter from "../utils/filter";
import { toast } from "../utils/notificationsSystem";

/** Filter for organizations. */
export const OrganizationFilter = () => {
	const { state, dispatch } = useContext(UserTableContext) as UserTableCtx;
	const users = useUsers(state.users);

	return (
		<div className="filter-wrapper">
			<div className="filter-label">Organization</div>
			<div className="organization-filter">
				<div>
					<button>
						<span>{state.filters.organization || "Select"} </span>
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
					<div>
						<button
							onClick={() =>
								dispatch({
									type: "SET_ORGANIZATION_FILTER",
									payload: "",
								})
							}
						>
							None
						</button>
						{users.organizations.map((option) => (
							<button
								key={option}
								onClick={() =>
									dispatch({
										type: "SET_ORGANIZATION_FILTER",
										payload: option,
									})
								}
							>
								{option}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

/** Filter for user status */
export const StatusFilter = () => {
	const { state, dispatch } = useContext(UserTableContext) as UserTableCtx;
	const users = useUsers(state.users);

	return (
		<div className="status-filter">
			<div>
				<button>
					<span>{state.filters.status || "Select"} </span>
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
				<div>
					<button
						onClick={() =>
							dispatch({
								type: "SET_STATUS_FILTER",
								payload: "",
							})
						}
					>
						None
					</button>
					{users.statuses.map((option) => (
						<button
							key={option}
							onClick={() =>
								dispatch({
									type: "SET_STATUS_FILTER",
									payload: option,
								})
							}
						>
							{option}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

/** Filter for username */
export const UsernameFilter = () => {
	const { state, dispatch } = useContext(UserTableContext) as UserTableCtx;

	return (
		<div className="filter-wrapper">
			<div className="filter-label">Username</div>
			<Input
				onChange={(e) =>
					dispatch({
						type: "SET_USERNAME_FILTER",
						payload: e.target.value,
					})
				}
				value={state.filters.username}
				placeholder="User"
				className="input-filter"
			/>
		</div>
	);
};

/** Filter for user email */
export const EmailFilter = () => {
	const { state, dispatch } = useContext(UserTableContext) as UserTableCtx;

	return (
		<div className="filter-wrapper">
			<div className="filter-label">Email</div>
			<Input
				onChange={(e) =>
					dispatch({
						type: "SET_EMAIL_FILTER",
						payload: e.target.value,
					})
				}
				value={state.filters.email}
				placeholder="Email"
				className="input-filter"
			/>
		</div>
	);
};

/** Filter for user registration date. Its value has no effect in the filter functionality. */
export const DateFilter = () => {
	const { state, dispatch } = useContext(UserTableContext) as UserTableCtx;

	return (
		<div className="filter-wrapper">
			<div className="filter-label">Date</div>
			<Input
				onChange={(e) =>
					dispatch({
						type: "SET_DATE_FILTER",
						payload: e.target.value,
					})
				}
				value={state.filters.date}
				placeholder="Date"
				type="date"
				className="input-filter"
			/>
		</div>
	);
};

/** Filter for user phone number */
export const PhoneNumberFilter = () => {
	const { state, dispatch } = useContext(UserTableContext) as UserTableCtx;

	return (
		<div className="filter-wrapper">
			<div className="filter-label">Phone Number</div>
			<Input
				onChange={(e) =>
					dispatch({
						type: "SET_PHONE_NUMBER_FILTER",
						payload: e.target.value,
					})
				}
				value={state.filters.phoneNumber}
				placeholder="Phone Number"
				type="tel"
				className="input-filter"
			/>
		</div>
	);
};

/** Single component combining all filters */
const Filter = () => {
	return (
		<div className="filter">
			<OrganizationFilter />
			<UsernameFilter />
			<EmailFilter />
			<DateFilter />
			<PhoneNumberFilter />
			<StatusFilter />
			<div className="btn-container">
				<ResetButton />
				<FilterButton />
			</div>
		</div>
	);
};

/** Filter button */
export const FilterButton = () => {
	const { state, dispatch } = useContext(UserTableContext) as UserTableCtx;

	return (
		<button onClick={() => filter(state, dispatch)} className="filter-btn">
			Filter
		</button>
	);
};

/** Reset button. Clears the filters and redisplays all the users */
export const ResetButton = () => {
	const { state, dispatch } = useContext(UserTableContext) as UserTableCtx;
	const reset = () => {
		dispatch({ type: "SET_EMAIL_FILTER", payload: "" });
		dispatch({ type: "SET_USERNAME_FILTER", payload: "" });
		dispatch({ type: "SET_PHONE_NUMBER_FILTER", payload: "" });
		dispatch({ type: "SET_DATE_FILTER", payload: "" });
		dispatch({ type: "SET_ORGANIZATION_FILTER", payload: "" });
		dispatch({ type: "SET_STATUS_FILTER", payload: "" });
		dispatch({ type: "SET_SEARCH_RESULTS", payload: state.users });
		dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
		console.log(state);

		toast.success("Filters reset successfully!");
	};
	return (
		<button onClick={reset} className="reset-btn">
			Reset
		</button>
	);
};

export default Filter;
