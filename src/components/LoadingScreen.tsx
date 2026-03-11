import { useEffect, useState } from "react"

const lines = [
  "analyzing responses...",
  "done.",
]

type Props = {
  onDone: () => void
}

export default function LoadingScreen({ onDone }: Props) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines < lines.length) {
      const delay = visibleLines === lines.length - 1 ? 800 : 600
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(onDone, 700)
      return () => clearTimeout(timer)
    }
  }, [visibleLines])

  return (
    <div className="flex flex-col justify-center min-h-screen px-8 max-w-2xl mx-auto font-mono">
      {lines.slice(0, visibleLines).map((line, i) => (
        <p
          key={i}
          className={`text-sm mb-2 ${
            i === lines.length - 1 ? "text-purple-400" : "text-gray-500"
          }`}
        >
          <span className="text-gray-600 mr-2">$</span>
          {line}
        </p>
      ))}
      {visibleLines < lines.length && (
        <span className="inline-block w-2 h-4 bg-purple-400 animate-pulse" />
      )}
    </div>
  )
}
