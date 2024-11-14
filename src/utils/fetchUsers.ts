import { User } from "../../types";

/** Helper function to fetch user from remote server */
const fetchUsers = (): Promise<User[] | undefined> =>
    new Promise(async (resolve) => {
        try {
            const response = await fetch(
                "https://run.mocky.io/v3/8b6ba517-9731-492a-a3cc-09ecb86f02b3",
            );
            const { data } = await response.json();

            resolve(data as User[]);
        } catch (error: any) {
            console.error("Error fetching users", error);
            // Don't reject. Return undefined instead.
            resolve(undefined);
        }
    });

export default fetchUsers;
