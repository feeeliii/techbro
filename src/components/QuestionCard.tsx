import type { Question } from "../data/questions"

type Props = {
  question: Question
  current: number
  total: number
  onAnswer: (agreed: boolean) => void
  labels?: { yes: string; no: string }
}

export default function QuestionCard({
  question,
  current,
  total,
  onAnswer,
  labels = { yes: "agree", no: "disagree" },
}: Props) {
  return (
    <div className="flex flex-col justify-center min-h-screen px-8 max-w-2xl mx-auto font-mono">
      { current > 0 && (
        <p className="text-xs text-gray-600 mb-8 uppercase tracking-widest">
          statement {current}/{total}
        </p>
    )}
      <div className="mb-12">
        <span className="text-purple-400 mr-3">›</span>
        <span className="text-white text-xl leading-relaxed">
          {question.text}
        </span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => onAnswer(true)}
          className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black transition-all text-sm tracking-widest uppercase whitespace-nowrap"
        >
          [ {labels.yes} ]
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black transition-all text-sm tracking-widest uppercase whitespace-nowrap"
        >
          [ {labels.no} ]
        </button>
      </div>

      <p className="mt-12 text-xs text-gray-700">
        # {question.source}
      </p>
    </div>
  )
}
