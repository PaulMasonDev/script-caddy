import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function WelcomeScreen() {
  return (
    <div className="flex justify-center text-4xl">
      <SignedOut>
        <h1>Please sign in with the nav bar</h1>
      </SignedOut>
      <SignedIn>
        <h1>Welcome to Market Saver!</h1>
      </SignedIn>
    </div>
  );
}
