import { useState, useEffect } from "react"
import { THRESHOLD_LOW, THRESHOLD_HIGH } from "./ResultCard"

const gradients = [
  "linear-gradient(135deg, #a78bfa, #ec4899, #f97316)",
  "linear-gradient(135deg, #60a5fa, #a78bfa, #ec4899)",
  "linear-gradient(135deg, #34d399, #60a5fa, #a78bfa)",
]

type Verdict = {
  words: string[]
  gradient: string
}

function getVerdict(percentage: number): Verdict {
  if (percentage <= THRESHOLD_LOW) {
    return {
      words: ["You", "are", "not", "a", "Tech", "Bro."],
      gradient: gradients[2],
    }
  }
  if (percentage <= THRESHOLD_HIGH) {
    return {
      words: ["Tech", "Bro", "tendencies."],
      gradient: gradients[1],
    }
  }
  return {
    words: ["You", "are", "a", "Tech", "Bro."],
    gradient: gradients[0],
  }
}

type Props = {
  percentage: number
  onContinue: () => void
}

export default function RevealScreen({ percentage, onContinue }: Props) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [sliding, setSliding] = useState(false)

  const verdict = getVerdict(percentage)

  useEffect(() => {
    if (visibleCount < verdict.words.length) {
      const timer = setTimeout(() => setVisibleCount((v) => v + 1), 400)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setShowButton(true), 800)
      return () => clearTimeout(timer)
    }
  }, [visibleCount])

  function handleContinue() {
    setSliding(true)
    setTimeout(onContinue, 700)
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6"
      style={{
        transform: sliding ? "translateY(-100vh)" : "translateY(0)",
        opacity: sliding ? 0 : 1,
        transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');`}</style>

      <div
        className="flex flex-wrap justify-center mb-12"
        style={{ gap: "0 0.1em", lineHeight: "1" }}
      >
        {verdict.words.map((word, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              background: verdict.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "clamp(2.5rem, 15vw, 7rem)",
              fontWeight: 900,
              filter:
                index < visibleCount
                  ? "drop-shadow(0px 8px 16px rgba(167,139,250,0.5))"
                  : "none",
              transform:
                index < visibleCount
                  ? "scale(1) translateY(0px)"
                  : "scale(0) translateY(40px)",
              opacity: index < visibleCount ? 1 : 0,
              transition:
                "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
              marginRight: "0.25em",
              cursor: "default",
              userSelect: "none",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      <div
        style={{
          opacity: showButton ? 1 : 0,
          transform: showButton ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
        className="flex flex-col items-center gap-6"
      >
        <p className="text-gray-400 text-center font-mono text-sm">
          {percentage}% agreement with tech bro ideas.
        </p>
        <button
          onClick={handleContinue}
          className="mt-8 px-8 py-4 border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black transition-all font-mono tracking-widest uppercase text-lg"
        >
          [ see breakdown → ]
        </button>
      </div>
    </div>
  )
}