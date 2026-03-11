import { useState, useEffect } from "react"

const words = ["Am", "I", "a", "Tech", "Bro?"]

const gradients = [
  "linear-gradient(135deg, #a78bfa, #ec4899, #f97316)",
  "linear-gradient(135deg, #60a5fa, #a78bfa, #ec4899)",
  "linear-gradient(135deg, #f97316, #ec4899, #a78bfa)",
  "linear-gradient(135deg, #34d399, #60a5fa, #a78bfa)",
  "linear-gradient(135deg, #ec4899, #a78bfa, #60a5fa)",
]

function BubbleWord({ word, index, visible }: { word: string; index: number; visible: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: gradients[index % gradients.length],
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontFamily: "'Fredoka One', cursive",
        fontSize: "clamp(3.5rem, 22vw, 8rem)",
        fontWeight: 900,
        filter: visible
          ? "drop-shadow(0px 8px 16px rgba(167,139,250,0.5))"
          : "none",
        transform: visible ? "scale(1) translateY(0px)" : "scale(0) translateY(40px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
        marginRight: "0.25em",
        cursor: "default",
        userSelect: "none",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1) translateY(-8px)" }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0px)" }}
    >
      {word}
    </span>
  )
}

export default function StartPage({ onStart }: { onStart: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showSubtitle, setShowSubtitle] = useState(false)

  useEffect(() => {
    if (visibleCount < words.length) {
      const timer = setTimeout(() => setVisibleCount((v) => v + 1), 500)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setShowSubtitle(true), 600)
      return () => clearTimeout(timer)
    }
  }, [visibleCount])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');`}</style>

      {/* Bubble Title */}
      <div className="flex flex-wrap justify-center mb-12" style={{ gap: "0 0.1em", lineHeight: "1" }}>

        {words.map((word, index) => (
          <BubbleWord key={word + index} word={word} index={index} visible={index < visibleCount} />
        ))}
      </div>

      {/* Subtitle + Button */}
        <div style={{
        opacity: showSubtitle ? 1 : 0,
        transform: showSubtitle ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
        className="flex flex-col items-center gap-6"
        >
        <p className="text-gray-400 text-center">
            14 statements. Just agree or disagree.
        </p>
        <button
            onClick={onStart}
            className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black transition-all text-sm tracking-widest uppercase font-mono"
        >
            [ let's find out ]
        </button>
        </div>

    </div>
  )
}
