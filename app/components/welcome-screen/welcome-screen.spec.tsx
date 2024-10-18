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
  it("All h1s are rendered", () => {
    render(<WelcomeScreen />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    headings.forEach((heading) => {
      expect(heading).toBeInTheDocument();
    });
  });
  it("There is one header for signed in and one for signed out", () => {
    render(<WelcomeScreen />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings.length).toBe(2);
  });
});
