// components/UpliftPopup.jsx
"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpliftPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const getUpliftSentence = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/uplift");
      const data = await response.json();
      setSentence(data.message);
      setShowPopup(true);
    } catch (error) {
      setSentence("Something went wrong. Please try again.");
      setShowPopup(true);
    }
    setFadeOut(false);
    setLoading(false);
  };

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowPopup(false);
      setFadeOut(false);
    }, 400);
  };

  return (
    <div className="relative">
      <Button
        variant="secondary"
        size="sm"
        onClick={getUpliftSentence}
        className="flex items-center gap-1"
      >
        <Sparkles className="w-4 h-4" />
        Get Motivated
      </Button>

      {showPopup && (
        <div
          className={`absolute z-50 right-0 mt-2 bg-white border border-purple-300 rounded-xl p-4 text-sm shadow-lg max-w-sm w-full transition-all duration-500 ${
            fadeOut ? "animate-fade-out" : "animate-fade-in"
          }`}
        >
          <button
            onClick={handleClose}
            className="absolute top-1 right-2 text-xs text-purple-700 hover:underline"
          >
            ✕
          </button>
          <div className="text-purple-800">
            <p className="font-semibold mb-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Daily Uplift
            </p>
            <p>{sentence}</p>
          </div>
        </div>
      )}
    </div>
  );
}
