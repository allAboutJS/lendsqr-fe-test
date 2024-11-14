import { render, screen, fireEvent } from "@testing-library/react";
import { UserTableContext } from "../src/pages/Dashboard/Users/Index";
import { OrganizationFilter, StatusFilter, UsernameFilter, EmailFilter, DateFilter, PhoneNumberFilter, FilterButton, ResetButton } from "../src/components/Filters";
import Filter from "../src/components/Filters";
import * as notificationsSystem from "../src/utils/notificationsSystem";
import filter from "../src/utils/filter";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import { UserTableCtx } from "../types";

// Mock the context and toast
const mockDispatch = vi.fn();
const mockContextValue = {
  state: {
    filters: {
      organization: "",
      status: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
    },
    users: [], // Sample data, adjust as needed
  },
  dispatch: mockDispatch,
};

vi.mock("../src/utils/filter", () => ({
	default: vi.fn()
}))

vi.mock("../src/utils/notificationsSystem", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Filter Components", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    vi.clearAllMocks();
  });

  test("OrganizationFilter renders and allows organization selection", () => {
    render(
      <UserTableContext.Provider value={mockContextValue as unknown as UserTableCtx}>
        <OrganizationFilter />
      </UserTableContext.Provider>
    );
    
    const organizationButton = screen.getByText("Select");
    fireEvent.click(organizationButton);

    const option = screen.getByText("None");
    fireEvent.click(option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_ORGANIZATION_FILTER",
      payload: "",
    });
  });

  test("StatusFilter renders and allows status selection", () => {
    render(
      <UserTableContext.Provider value={mockContextValue as unknown as UserTableCtx}>
        <StatusFilter />
      </UserTableContext.Provider>
    );

    const statusButton = screen.getByText("Select");
    fireEvent.click(statusButton);

    const option = screen.getByText("None");
    fireEvent.click(option);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_STATUS_FILTER",
      payload: "",
    });
  });

  test("UsernameFilter renders and accepts input", () => {
    render(
      <UserTableContext.Provider value={mockContextValue as unknown as UserTableCtx}>
        <UsernameFilter />
      </UserTableContext.Provider>
    );

    const usernameInput = screen.getByPlaceholderText("User");
    fireEvent.change(usernameInput, { target: { value: "JohnDoe" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_USERNAME_FILTER",
      payload: "JohnDoe",
    });
  });

  test("EmailFilter renders and accepts input", () => {
    render(
      <UserTableContext.Provider value={mockContextValue as unknown as UserTableCtx}>
        <EmailFilter />
      </UserTableContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_EMAIL_FILTER",
      payload: "test@example.com",
    });
  });

  test("DateFilter renders and accepts date input", () => {
    render(
      <UserTableContext.Provider value={mockContextValue as unknown as UserTableCtx}>
        <DateFilter />
      </UserTableContext.Provider>
    );

    const dateInput = screen.getByPlaceholderText("Date");
    fireEvent.change(dateInput, { target: { value: "2024-11-14" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_DATE_FILTER",
      payload: "2024-11-14",
    });
  });

  test("PhoneNumberFilter renders and accepts phone number input", () => {
    render(
      <UserTableContext.Provider value={mockContextValue as unknown as UserTableCtx}>
        <PhoneNumberFilter />
      </UserTableContext.Provider>
    );

    const phoneInput = screen.getByPlaceholderText("Phone Number");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_PHONE_NUMBER_FILTER",
      payload: "1234567890",
    });
  });

  test("FilterButton triggers filter function", () => {
    render(
      <UserTableContext.Provider value={mockContextValue as unknown as UserTableCtx}>
        <FilterButton />
      </UserTableContext.Provider>
    );

    const filterButton = screen.getByText("Filter");
    fireEvent.click(filterButton);

    expect(filter).toHaveBeenCalled(); // Assuming filter function triggers a dispatch
  });

  test("ResetButton clears filters and shows success toast", () => {
    render(
      <UserTableContext.Provider value={mockContextValue as unknown as UserTableCtx}>
        <ResetButton />
      </UserTableContext.Provider>
    );

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    expect(notificationsSystem.toast.success).toHaveBeenCalledWith("Filters reset successfully!");
  });

  test("Filter component renders all filter and button components", () => {
    render(
      <UserTableContext.Provider value={mockContextValue as unknown as UserTableCtx}>
        <Filter />
      </UserTableContext.Provider>
    );

    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("User")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Date")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });
});
