"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const slides = [
  {
    title: "📘 What is NorthStory?",
    content: (
      <>
        NorthStory is a digital sanctuary for students affected by crisis —
        a social platform that promotes academic collaboration, emotional strength,
        and community resilience. <br />
        It was born out of compassion and shaped by the student voice.
      </>
    ),
  },
  {
    title: "💡 Why NorthStory Matters",
    content: (
      <>
        Many students face emotional stress, academic interruptions, and social isolation.
        <br />
        NorthStory brings connection, purpose, and motivation to help navigate tough times.
      </>
    ),
  },
  {
    title: "🛠️ What You Can Do Here",
    content: (
      <>
        - 📢 Post and discuss topics by faculty <br />
        - 🌞 Get a daily uplifting message powered by AI <br />
        - ✍️ Share anonymously in your safe space <br />
        - 🧠 Join study groups to collaborate <br />
        - 🎮 Play games or take CS quizzes with friends
      </>
    ),
  },
  {
    title: "🎉 Thank You for Being Here",
    content: (
      <>
        We're a student team who built this to support YOU. <br />
        Built with ❤️ by: Shlomi, Alex, Eitan, Noy, Yovel, and Shahar.
        <br />
        Together, we thrive.
      </>
    ),
  },
];

export default function AboutCarousel() {
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{ loop: true }}
        className="relative"
      >
        <CarouselContent className="min-h-[200px]">
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 shadow-lg bg-background min-h-[200px]">
                  <CardContent className="space-y-4">
                    <h3
                      className={`text-xl md:text-2xl font-bold ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      {slide.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {slide.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        <CarouselPrevious className="backdrop-blur-md border border-gray-300/30" />
        <CarouselNext className="backdrop-blur-md border border-gray-300/30" />
      </Carousel>
    </div>
  );
}
