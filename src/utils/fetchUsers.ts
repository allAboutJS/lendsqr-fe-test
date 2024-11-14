import { User } from "../../types";

/** Helper function to fetch user from remote server */
const fetchUsers = (): Promise<User[] | undefined> =>
    new Promise((resolve) => {
        fetch(
            "https://run.mocky.io/v3/8b6ba517-9731-492a-a3cc-09ecb86f02b3",
        )
            .then((response) => response.json())
            .then(({ data }) => resolve(data as User[]))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((error: any) => {
                console.error("Error fetching users", error);
                // Don't reject. Return undefined instead.
                resolve(undefined);
            });
    });

export default fetchUsers;
