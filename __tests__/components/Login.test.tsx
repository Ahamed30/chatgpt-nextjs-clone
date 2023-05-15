/** @jsx jsx */
import { jsx } from "@emotion/react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import Login from "@/app/auth/login/page";

jest.mock("firebase/auth");
jest.mock("next/navigation");

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should display error message when invalid credentials are entered", async () => {
    const mockSignIn = jest.fn(async () => {
      throw new Error("Invalid credentials");
    });
    (signInWithEmailAndPassword as jest.Mock).mockImplementationOnce(
      mockSignIn
    );

    render(<Login />);

    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign in" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    expect(mockSignIn).toHaveBeenCalledWith(
      auth,
      "test@example.com",
      "password123"
    );

    const errorMessage = await screen.findByText(
      "Email or Password is invalid."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should navigate to '/getApiKey' after successful sign-in", async () => {
    const mockSignIn = jest.fn();
    (signInWithEmailAndPassword as jest.Mock).mockImplementationOnce(
      mockSignIn
    );

    render(<Login />);

    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign in" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    expect(mockSignIn).toHaveBeenCalledWith(
      auth,
      "test@example.com",
      "password123"
    );
  });
});
