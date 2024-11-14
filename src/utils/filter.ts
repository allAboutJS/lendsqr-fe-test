/** This file contains the logic for filtering users based on specified criteria in the filter state */

import { Dispatch } from "react";
import { ReducerAction, User, UserTableState } from "../../types";
import { toast } from "./notificationsSystem";

/** Helper function for filtering users based on the filter state */
const filter = (
	state: UserTableState,
	dispatch: Dispatch<ReducerAction>,
	silent?: true,
) => {
	const checkOtherFields = (user: User) => {
		if (
			state.filters.email &&
			state.filters.phoneNumber &&
			state.filters.username
		) {
			if (
				user.personalInfo.email
					.toLowerCase()
					.trim()
					.includes(state.filters.email.toLowerCase().trim()) &&
				user.personalInfo.phoneNumber
					.trim()
					.includes(state.filters.phoneNumber.trim()) &&
				user.personalInfo.name
					.toLowerCase()
					.trim()
					.includes(state.filters.username.toLowerCase().trim())
			)
				return true;

			return false;
		} else if (
			state.filters.email ||
			state.filters.phoneNumber ||
			state.filters.username
		) {
			if (
				state.filters.email &&
				user.personalInfo.email
					.toLowerCase()
					.trim()
					.includes(state.filters.email.toLowerCase().trim())
			)
				return true;

			if (
				state.filters.phoneNumber &&
				user.personalInfo.phoneNumber
					.toLowerCase()
					.trim()
					.includes(state.filters.phoneNumber.toLowerCase().trim())
			)
				return true;

			if (
				state.filters.username &&
				user.personalInfo.name
					.toLowerCase()
					.trim()
					.includes(state.filters.username.toLowerCase().trim())
			)
				return true;

			return false;
		} else return false;
	};

	const filterResults = state.users.filter((user) => {
		if (state.filters.status && state.filters.organization) {
			if (
				user.personalInfo.status === state.filters.status &&
				user.personalInfo.organization === state.filters.organization
			) {
				if (
					state.filters.email ||
					state.filters.phoneNumber ||
					state.filters.username
				)
					return checkOtherFields(user);

				return true;
			} else return false;
		} else if (state.filters.status || state.filters.organization) {
			if (
				state.filters.status &&
				user.personalInfo.status === state.filters.status
			) {
				if (
					state.filters.email ||
					state.filters.phoneNumber ||
					state.filters.username
				)
					return checkOtherFields(user);

				return true;
			}

			if (
				state.filters.organization &&
				user.personalInfo.organization === state.filters.organization
			) {
				if (
					state.filters.email ||
					state.filters.phoneNumber ||
					state.filters.username
				)
					return checkOtherFields(user);

				return true;
			}

			return false;
		} else return checkOtherFields(user);
	});

	if (filterResults.length === 0)
		return (
			silent || toast.warn("No results are available for this search!"),
			dispatch({ type: "SET_SEARCH_RESULTS", payload: state.users })
		);

	dispatch({ type: "SET_SEARCH_RESULTS", payload: filterResults });
	dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
	silent ||
		toast.success(
			`Found ${filterResults.length} entries that match your search!`,
		);
};

export default filter;
