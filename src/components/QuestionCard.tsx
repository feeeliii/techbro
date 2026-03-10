import type { Question } from "../data/questions"


type Props = {
    question: Question // Question object from src/data/questions.ts
    current: number
    total: number
    onAnswer: (agreed: boolean) => void
}

export default function QuestionCard({ question, current, total, onAnswer }: Props) {
    return (
         <div className="flex flex-col items-center justify-center min-h-screen px-6">
      
      {/* Progress */}
      <p className="text-sm text-gray-400 mb-8">
        {current} / {total}
      </p>

      {/* Question */}
      <div className="max-w-xl w-full mb-12">
        <p className="text-2xl font-medium text-center leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => onAnswer(false)}
          className="px-10 py-4 rounded-full border border-gray-400 text-gray-300 hover:bg-gray-800 transition-all"
        >
          Disagree
        </button>
        <button
          onClick={() => onAnswer(true)}
          className="px-10 py-4 rounded-full bg-white text-black hover:bg-gray-200 transition-all"
        >
          Agree
        </button>
      </div>

      {/* Source */}
      <p className="mt-12 text-xs text-gray-600">
        Source: {question.source}
      </p>

    </div>
    )
}
