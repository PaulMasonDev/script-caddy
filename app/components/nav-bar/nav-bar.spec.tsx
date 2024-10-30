import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import NavBar from "./nav-bar";

jest.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignedOut: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignInButton: () => <button>Sign In</button>,
  UserButton: () => <button>User</button>,
}));

describe("NavBar", () => {
  it("renders the header with the correct text", () => {
    render(<NavBar />);
    expect(screen.getByText("Script Caddy")).toBeInTheDocument();
  });

  it("renders SignInButton when signed out", () => {
    render(
      <SignedOut>
        <NavBar />
      </SignedOut>
    );
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders UserButton when signed in", () => {
    render(
      <SignedIn>
        <NavBar />
      </SignedIn>
    );
    expect(screen.getByText("User")).toBeInTheDocument();
  });
});
