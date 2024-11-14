import { User } from "../../types";

/** Helper function to fetch users from IndexedDB */
const fetchUsersFromDB = (): Promise<User[] | undefined> =>
    new Promise((resolve) => {
        if (window.indexedDB) {
            const openDbRequest = window.indexedDB.open("LendsQR", 1);
            const errorEventHandler = () => {
                console.error("Error loading DB");
                resolve(undefined);
            };

            openDbRequest.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create a store for the users data if it doesn't already exist
                if (!db.objectStoreNames.contains("users")) {
                    db.createObjectStore("users", {
                        keyPath: "id",
                        autoIncrement: true,
                    });
                }
            };

            openDbRequest.onsuccess = () => {
                try {
                    const db = openDbRequest.result;
                    const transcation = db.transaction("users", "readonly");
                    const store = transcation.objectStore("users");
                    const request = store.getAll();

                    db.onerror = errorEventHandler;
                    transcation.onerror = errorEventHandler;
                    request.onerror = errorEventHandler;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    request.onsuccess = (event: any) =>
                        // Resolve undefined if users array is empty
                        resolve(
                            event.target?.result?.length
                                ? event.target?.result
                                : undefined,
                        );
                } catch (error) {
                    console.error("Error loading DB");
                    resolve(undefined);
                }
            };

            openDbRequest.onerror = errorEventHandler;
        } else {
            console.error("IndexedDB is unavailable in this browser");
            resolve(undefined);
        }
    });

export default fetchUsersFromDB;
