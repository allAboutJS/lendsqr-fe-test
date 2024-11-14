import { ReducerAction, UserTableState } from "../../types";

/** Reducer function for state management */
const reducer = (state: UserTableState, action: ReducerAction) => {
	if (action.type === "SET_SEARCH_RESULTS")
		return { ...state, searchResults: action.payload };
	if (action.type === "SET_DISPLAY_LIMIT")
		return { ...state, displayLimit: action.payload };
	if (action.type === "SET_TOTAL_PAGES")
		return { ...state, totalPages: action.payload };
	if (action.type === "SET_CURRENT_PAGE")
		return { ...state, currentPage: action.payload };
	if (action.type === "SET_USERS") return { ...state, users: action.payload };
	if (action.type === "SET_EMAIL_FILTER")
		return {
			...state,
			filters: { ...state.filters, email: action.payload },
		};
	if (action.type === "SET_USERNAME_FILTER")
		return {
			...state,
			filters: { ...state.filters, username: action.payload },
		};
	if (action.type === "SET_PHONE_NUMBER_FILTER")
		return {
			...state,
			filters: { ...state.filters, phoneNumber: action.payload },
		};
	if (action.type === "SET_DATE_FILTER")
		return {
			...state,
			filters: { ...state.filters, date: action.payload },
		};
	if (action.type === "SET_ORGANIZATION_FILTER")
		return {
			...state,
			filters: { ...state.filters, organization: action.payload },
		};
	if (action.type === "SET_STATUS_FILTER")
		return {
			...state,
			filters: { ...state.filters, status: action.payload },
		} as UserTableState;

	return state;
};

export default reducer;
