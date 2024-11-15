import { Dispatch, SetStateAction } from "react";
import fetchUsers from "./fetchUsers";
import fetchUsersFromDB from "./fetchUsersFromDB";
import { toast } from "./notificationsSystem";
import { User } from "../../types";
import saveUsersToDb from "./saveUsersToDb";

/** Helper function to load users from browser cache or remote server */
const loadUsers = async (
	setUsers: Dispatch<SetStateAction<User[] | undefined>>,
	silent?: true,
) => {
	// Fetch users locally from IndexedDB
	let users = await fetchUsersFromDB();

	// Fetch users remotely
	if (!users) {
		silent ||
			toast.error("Failed to fetch users locally. Fetching remotely..."); // Only show this toast on initial call
		users = await fetchUsers();

		// If there are still no users try again after 10 seconds
		if (!users) {
			setTimeout(() => {
				toast.error("Failed to fetch users. Retrying...");
				loadUsers(setUsers, true);
			}, 10000);
		} else {
			setUsers(users);

			// Save the users to IndexedDb
			saveUsersToDb(users);
		}
	} else {
		setUsers(users);
	}
};

export default loadUsers;
