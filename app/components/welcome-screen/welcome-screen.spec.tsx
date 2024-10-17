import "@testing-library/jest-dom";

import WelcomeScreen from "./welcome-screen";
import { render, screen } from "@testing-library/react";

jest.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SignedOut: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ClerkProvider: jest.fn(),
}));

describe("WelcomeScreen", () => {
  it("renders an h1", () => {
    // Arrange
    render(<WelcomeScreen />);
    // Act
    // Assert
    expect(
      screen.getByText(/Please sign in with the nav bar/)
    ).toBeInTheDocument();
  });
});
