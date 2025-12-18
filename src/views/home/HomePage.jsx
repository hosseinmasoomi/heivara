"use client";

import { useRouter } from "next/navigation";
import HomeHeader from "./components/HomeHeader";
import LandingPage from "./components/LandingPage";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617]" dir="rtl">
      <HomeHeader
        onGoHome={() => router.push("/")}
        onGoMagazine={() => router.push("/magazine")}
        onGoLogin={() => router.push("/login")}
        onGoWizard={() => router.push("/wizard")}
      />

      <main className="pt-20">
        <LandingPage onStart={() => router.push("/wizard")} />
      </main>
    </div>
  );
}
