import { Dispatch, SetStateAction } from "react";
import fetchUsers from "./fetchUsers";
import fetchUsersFromDB from "./fetchUsersFromDB";
import { toast } from "./notificationsSystem";
import { User } from "../../types";
import saveUsersToDb from "./saveUsersToDb";

/** Helper function to load users from browser cache or remote server */
const loadUsers = async (setUsers: Dispatch<SetStateAction<User[] | undefined>>) => {
	// Fetch users locally from IndexedDB
	let users = await fetchUsersFromDB();

	// Fetch users remotely
	if (!users) {
		toast.error("Failed to fetch users locally. Fetching remotely...");
		users = await fetchUsers();

		// If there are still no users try again
		if (!users) {
			toast.error("Failed to fetch users. Retrying...");
			setTimeout(loadUsers, 1000);
		} else {
			setUsers(users);

			// Save the users to IndexedDb
			saveUsersToDb(users);
		}
	} else {
		setUsers(users)
	}
};

export default loadUsers;
