
import Hero from "../components/Headers/Hero";
import About from "../components/Headers/About";
import UserExperinces from "../components/Headers/UserExperinces";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Hero />
      <About />
      <UserExperinces />
    </div>
  );
}

