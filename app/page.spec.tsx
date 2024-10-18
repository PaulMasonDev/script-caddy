import { render, screen } from "@testing-library/react";
import Home from "./page";

jest.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignedOut: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignInButton: () => <button>Sign In</button>,
  UserButton: () => <button>User</button>,
}));

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("renders the WelcomeScreen component", () => {
    render(<Home />);
    expect(screen.getByTestId("welcome-screen")).toBeInTheDocument();
  });
});
