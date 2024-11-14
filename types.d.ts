export interface ToastOptions {
    duration: number;
    onClick?: () => any;
}

export interface AlertOptions {
    onClose?: () => any;
    btnText?: string;
}

export interface User {
    id: string;
    tier: 1 | 2 | 3;
    loanAmount: number;
    hasLoan: boolean;
    hasSavings: boolean;
    bankDetails: {
        accountNumber: string;
        bankName: string;
        bvn: string;
    };
    personalInfo: {
        organization: string;
        name: string;
        email: string;
        phoneNumber: string;
        dateJoined: Date;
        status: "Pending" | "Inactive" | "Active" | "Blacklisted";
        gender: "MALE" | "FEMALE";
        maritalStatus: "Single" | "Married" | "Divorced";
        children: "None" | number;
    };
    educationAndEmployment: {
        employerName: string;
        employmentStatus: "Employed" | "Unemployed";
        employmentsector: "FinTech" | "Marketing" | "Engineering" | "Health";
        employmentDuration: number;
        officeEmail: string;
        monthlyIncome:
            | "₦35,000.00 - ₦100,000.00"
            | "₦100,000.00 - ₦200,000.00"
            | "₦200,000.00 - ₦400,000.00"
            | "₦400,000.00 - ₦1,000,000.00"
            | "₦1,000,000.00 - ₦5,000,000.00";
        loanRepayment: number;
    };
    socials: {
        facebook: string;
        twitter: string;
        instagram: string;
    };
    guarantors: {
        name: string;
        email: string;
        phoneNumber: string;
        relationship:
            | "Sister"
            | "Brother"
            | "Father"
            | "Mother"
            | "Aunt"
            | "Uncle"
            | "Cousin";
    }[];
}

export interface UserTableState {
    searchResults: User[];
    filters: {
        organization: string;
        email: string;
        username: string;
        phoneNumber: string;
        status: User["personalInfo"]["status"] | "";
        date: string;
    };
    users: User[];
    currentPage: number;
    totalPages: number;
    displayLimit: number;
}

export type ReducerAction =
    | { type: "SET_USERS"; payload: User[] }
    | { type: "SET_SEARCH_RESULTS"; payload: User[] }
    | { type: "SET_TOTAL_PAGES"; payload: number }
    | { type: "SET_DISPLAY_LIMIT"; payload: number }
    | { type: "SET_EMAIL_FILTER"; payload: string }
    | { type: "SET_USERNAME_FILTER"; payload: string }
    | { type: "SET_PHONE_NUMBER_FILTER"; payload: string }
    | { type: "SET_DATE_FILTER"; payload: string }
    | { type: "SET_ORGANIZATION_FILTER"; payload: string }
    | { type: "SET_STATUS_FILTER"; payload: string }
    | { type: "SET_CURRENT_PAGE"; payload: number };

export interface UserTableCtx {
    state: UserTableState;
    dispatch: Dispatch<ReducerAction>;
}
