import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import * as notificationsSystem from "../src/utils/notificationsSystem";
import LoginForm from "../src/components/LoginForm";
import "@testing-library/jest-dom";
import React from "react";

// Mock the navigate function from react-router-dom
vi.mock("react-router-dom", async (originalImport) => ({
  ...(await originalImport()),
  useNavigate: () => vi.fn(),
}));

// Mock the toast and alert system
vi.mock("../src/utils/notificationsSystem", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  alert: vi.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  test("Renders LoginForm component with email and password input", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    // Check if email and password input fields are rendered
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /LOG IN/i })).toBeInTheDocument();
  });

  test("Shows error when email format is invalid", async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /LOG IN/i });

    // Enter invalid email and valid password
    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(passwordInput, "ValidPassword1!");

    // Submit the form
    await userEvent.click(submitButton);

    await waitFor(() =>
      expect(notificationsSystem.toast.error).toHaveBeenCalledWith(
        "Invalid email format. Please enter a valid email address."
      )
    );
  });

  test("Shows error when password format is invalid", async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /LOG IN/i });

    // Enter valid email and invalid password
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password");

    // Submit the form
    await userEvent.click(submitButton);

    await waitFor(() =>
      expect(notificationsSystem.toast.error).toHaveBeenCalledWith(
        "Password must be at least six (6) characters (at least one uppercase, one lowercase and one special character)."
      )
    );
  });

  test("Shows success message and navigates to dashboard when valid credentials are provided", async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /LOG IN/i });

    // Enter valid credentials
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "ValidPassword1!");

    // Submit the form
    await userEvent.click(submitButton);

    // Wait for the success toast and verify navigation
    await waitFor(() =>
      expect(notificationsSystem.toast.success).toHaveBeenCalledWith(
        "Logged in as Adedeji"
      )
    );
  });

  test("Alert appears when 'Forgot Password' is clicked", async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const forgotPasswordLink = screen.getByText("FORGOT PASSWORD");

    await userEvent.click(forgotPasswordLink);

    await waitFor(() =>
      expect(notificationsSystem.alert).toHaveBeenCalledWith(
        "Sorry this feature is not available"
      )
    );
  });
});
