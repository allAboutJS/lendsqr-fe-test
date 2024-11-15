import { User } from "../../types";

/** Helper function to fetch user from remote server */
const fetchUsers = (): Promise<User[] | undefined> =>
    new Promise((resolve) => {
        fetch(
            "https://run.mocky.io/v3/a70a94d7-ad1f-4cb2-869f-ec2399ec7e2c",
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
