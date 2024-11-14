/** This file contains the logic for all the functionalities provided by the useUsers hook. */

import { User } from "../../types";

/** Helper hook for manipulating users data */
const useUsers = (users: User[]) => {
    return {
        get activeUsers(): User[] {
            return users.filter(
                (user) => user.personalInfo.status === "Active",
            );
        },
        get inactiveUsers(): User[] {
            return users.filter(
                (user) => user.personalInfo.status === "Inactive",
            );
        },
        get blacklistedUsers(): User[] {
            return users.filter(
                (user) => user.personalInfo.status === "Blacklisted",
            );
        },
        get pendingUsers(): User[] {
            return users.filter(
                (user) => user.personalInfo.status === "Pending",
            );
        },
        get usersWithLoanCount(): number {
            return users.filter((user) => user.hasLoan).length;
        },
        get usersWithSavings(): number {
            return users.filter((user) => user.hasSavings).length;
        },
        get organizations(): string[] {
            return Array.from(
                new Set(users.map((user) => user.personalInfo.organization)),
            );
        },
        get statuses(): User["personalInfo"]["status"][] {
            return ["Pending", "Inactive", "Active", "Blacklisted"];
        },
    };
};

export default useUsers;
