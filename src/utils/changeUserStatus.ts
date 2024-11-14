import { Dispatch, SetStateAction } from "react";
import { ReducerAction, User, UserTableState } from "../../types";
import { toast } from "./notificationsSystem";
import filter from "./filter";

const changeUserStatus = (
    id: string,
    newStatus: User["personalInfo"]["status"],
    dispatch?: Dispatch<ReducerAction>,
    currentState?: UserTableState,
    setState?: Dispatch<SetStateAction<User>>,
) => {
    if (window.indexedDB) {
        try {
            const openDbReq = window.indexedDB.open("LendsQR", 1);
            const toastError = () => toast.error("Request failed!");

            openDbReq.onsuccess = () => {
                const db = openDbReq.result;
                const transaction = db.transaction("users", "readwrite");
                const store = transaction.objectStore("users");
                const userReq = store.get(id);
                // check the request object regularly till the result is ready
                userReq.onsuccess = () => {
                    const user = userReq.result;
                    const updatedUser = {
                        ...user,
                        personalInfo: {
                            ...user.personalInfo,
                            status: newStatus,
                        },
                    };
                    // Change the users status
                    const updateReq = store.put(updatedUser);

                    updateReq.onerror = toastError;
                    updateReq.onsuccess = async () => {
                        if (dispatch) {
                            const updatedUsers = currentState?.users.map(
                                (user) => (user.id === id ? updatedUser : user),
                            ) as User[];

                            dispatch({
                                type: "SET_USERS",
                                payload: updatedUsers,
                            });
                            currentState &&
                                filter(
                                    { ...currentState, users: updatedUsers },
                                    dispatch,
                                    true,
                                );
                        }

                        if (setState) setState(updatedUser);

                        newStatus === "Active"
                            ? toast.success(
                                  `${user.personalInfo.name} has been activated successfully!`,
                              )
                            : toast.success(
                                  `${user.personalInfo.name} has been blacklisted successfully!`,
                              );
                    };

                    transaction.onerror = toastError;
                    userReq.onerror = toastError;
                };

                openDbReq.onerror = toastError;
            };
        } catch (error) {
            console.error('Error while updating user status', error)
            toast.error('Request failed!');
        }
    } else toast.error("Request failed!");
};

export default changeUserStatus;
