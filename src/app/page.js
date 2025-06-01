"use client";

import { useAuth } from "@/context/AuthContext";
import Forum from "@/components/Forum";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AboutCarousel from "@/components/AboutCarousel";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-black overflow-hidden">
        {/* 🌄 Background Image + Gradient Fade */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/8744.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.4,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0f0f0f]" />
        </div>

        {/* 📝 Hero Section */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-10">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight dark:text-white text-black">
            Welcome to NorthStory <span role="img">📘</span>
          </h1>
          <p className="text-lg max-w-xl text-muted-foreground mb-6">
            A safe, empowering space for students to connect, support, and grow — together.
          </p>
          <div className="flex gap-4 mb-10">
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about-us">Learn More</Link>
            </Button>
          </div>
        </section>

        {/* 🧭 Carousel */}
        <AboutCarousel />
      </div>
    );
  }

  return <Forum />;
}
