import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function UpliftCard() {
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
    // מחכה לסיום האנימציה לפני הסרה
    setTimeout(() => {
      setShowPopup(false);
      setFadeOut(false);
    }, 400); // זמן תואם לאורך האנימציה
  };

  return (
    <div className="flex flex-col items-center justify-start text-center p-4 bg-purple-50 shadow-md rounded-xl border border-purple-300 max-w-md w-full mx-auto">
      {!showPopup && (
        <>
          <h1 className="text-md font-semibold text-purple-800 mb-2">Welcome, Student!</h1>
          <p className="text-sm text-purple-700 mb-1">Feeling stressed about exams?</p>
          <p className="text-sm text-purple-700 mb-3">Get your daily dose of motivation!</p>
          <button
            onClick={getUpliftSentence}
            className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-1.5 px-4 rounded-full transition"
          >
            {loading ? "Loading..." : "Get Motivated!"}
          </button>
        </>
      )}

      {showPopup && (
        <div
          className={`relative w-full border rounded-xl p-4 text-center shadow-inner transition-all duration-500 ${
            fadeOut ? "animate-fade-out" : "animate-fade-in"
          }`}
          style={{ borderColor: "aliceblue" }}
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full transition"
          >
            ✕
          </button>
          <h2 className="text-base font-medium mb-2 text-purple-700 flex items-center justify-center gap-1">
            <Sparkles className="w-5 h-5" /> Daily Uplift
          </h2>
          <p className="text-purple-800 text-sm">{sentence}</p>
        </div>
      )}
    </div>
  );
}
