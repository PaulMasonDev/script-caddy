import { SignedIn, SignedOut } from "@clerk/nextjs";

import SignedInFlow from "../signed-in-flow/signed-in-flow";

export default function WelcomeScreen() {
  return (
    <div className="flex justify-center text-4xl" data-testid="welcome-screen">
      <SignedOut>
        <Landing headingText="Please sign in above" />
      </SignedOut>
      <SignedIn>
        <SignedInFlow />
      </SignedIn>
    </div>
  );
}

export const Landing = ({ headingText }: { headingText: string }) => {
  return <h1>{headingText}</h1>;
};
