/** This file contains the logic for loading details of a single user to the user details page */

import { User } from "../../types";
import { toast } from "./notificationsSystem";

const userDetailsLoader = ({
    params,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any;
}): Promise<User | null> =>
    new Promise((resolve) => {
        // Find user in the database first
        try {
            if (window.indexedDB) {
                const openDbRequest = window.indexedDB.open("LendsQR", 1);

                // Log the error event
                openDbRequest.onerror = console.log;

                openDbRequest.onsuccess = () => {
                    const db = openDbRequest.result;
                    const transaction = db.transaction("users", "readonly");
                    const store = transaction.objectStore("users");
                    const userData = store.get(params.id);
                    const interval = setInterval(() => {
                        if (userData.readyState === "done") {
                            clearInterval(interval);
                            resolve(userData.result || null);
                        }
                    }, 100);

                    userData.onerror = console.log;
                    transaction.onerror = console.log;
                };
            } else {
                toast.info("Loading user details remotely.");
            }
        } catch (error) {
            console.log("Error loading user", error);
            toast.error("Error loading user info!");
            resolve(null);
        }
    });

export default userDetailsLoader;
