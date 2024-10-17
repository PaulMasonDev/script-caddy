import WelcomeScreen from "./components/welcome-screen/welcome-screen";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex-auto">
      <main className="p-4">
        <WelcomeScreen />
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        &copy; Paul Mason 2024
      </footer> */}
    </div>
  );
}

