import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function WelcomeScreen() {
  return (
    <div className="flex justify-center text-4xl" data-testid="welcome-screen">
      <SignedOut>
        <Landing headingText="Please sign in above" />
      </SignedOut>
      <SignedIn>
        <Landing headingText="Welcome to Script Caddy!" />
      </SignedIn>
    </div>
  );
}

const Landing = ({ headingText }: { headingText: string }) => {
  return <h1>{headingText}</h1>;
};
