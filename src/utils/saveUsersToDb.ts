import { User } from "../../types";

const saveUsersToDb = (users: User[]) => {
    try {
        if (!window.indexedDB)
            throw Error("IndexedDB is unavailable in this browser");

        const openDbRequest = window.indexedDB.open("LendsQR", 1);

        openDbRequest.onsuccess = () => {
            const db = openDbRequest.result;
            const transaction = db.transaction("users", "readwrite");
            const store = transaction.objectStore("users");

            // Add users to the store
            for (const user of users) store.add(user);

            transaction.onerror = (event) =>
                console.error("Error during transaction to save users:", event);
        };

        openDbRequest.onerror = (event) =>
            console.error("Error opening database:", event);
    } catch (error) {
        console.error("Error saving users to IndexedDB:", error);
    }
};

export default saveUsersToDb;
