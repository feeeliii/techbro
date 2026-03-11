// components/ResultCard.tsx

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import type { GenderContext } from "../data/questions"
import { questions, genderNote, categories } from "../data/questions"
import RadarChart from "./RadarChart"

type Props = {
  answers: number[]
  gender: GenderContext | null
}

type AvgData = Record<string, number>

function getBarGradient(percentage: number): string {
  if (percentage === 0) return "rgba(255,255,255,0.1)"
  if (percentage <= 33) return "linear-gradient(135deg, #34d399, #60a5fa)"
  if (percentage <= 66) return "linear-gradient(135deg, #60a5fa, #a78bfa)"
  return "linear-gradient(135deg, #a78bfa, #ec4899, #f97316)"
}

export default function ResultCard({ answers, gender }: Props) {
  const [totalParticipants, setTotalParticipants] = useState<number | null>(null)
  const [averageScore, setAverageScore] = useState<number | null>(null)
  const [avgByCategory, setAvgByCategory] = useState<AvgData>({})
  const [copied, setCopied] = useState(false)

  const totalScore = answers.reduce((a, b) => a + b, 0)
  const totalQuestions = questions.length
  const percentage = Math.round((totalScore / totalQuestions) * 100)

  const categoryScores = categories.map((cat) => {
    const catQuestions = questions.filter((q) => q.category === cat)
    const catAnswers = catQuestions.map((q) => answers[q.id - 1])
    const catScore = catAnswers.reduce((a, b) => a + b, 0)
    return { cat, catScore, catTotal: catQuestions.length }
  })

  const radarData = categoryScores.map(({ cat, catScore, catTotal }) => ({
    label: cat,
    value: catScore / catTotal,
  }))

  useEffect(() => {
    supabase
      .from("results")
      .insert({
        gender_context: gender,
        total_score: totalScore,
        answers: answers,
      })
      .then(() => {
        supabase
          .from("results")
          .select("total_score, answers")
          .then(({ data }) => {
            if (data && data.length > 0) {
              setTotalParticipants(data.length)
              const avg =
                data.reduce((a, b) => a + b.total_score, 0) / data.length
              setAverageScore(Math.round((avg / questions.length) * 100))

              const catAvgs: AvgData = {}
              categories.forEach((cat) => {
                const catQuestions = questions.filter((q) => q.category === cat)
                const catTotal = catQuestions.length
                const sum = data.reduce((acc, row) => {
                  const rowAnswers = row.answers as number[]
                  const catScore = catQuestions.reduce(
                    (s, q) => s + (rowAnswers[q.id - 1] ?? 0),
                    0
                  )
                  return acc + catScore
                }, 0)
                catAvgs[cat] = Math.round((sum / (data.length * catTotal)) * 100)
              })
              setAvgByCategory(catAvgs)
            }
          })
      })
  }, [])

  function handleShare() {
    const text = "Am I a Tech Bro? 23 statements. Agree or Disagree. Take the quiz:"
    const url = window.location.origin

    if (navigator.share) {
      navigator.share({ title: "Am I a Tech Bro?", text, url })
    } else {
      navigator.clipboard.writeText(`${text} ${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-8 py-16 max-w-2xl mx-auto font-mono">
      {/* Header */}
      <p className="text-xs text-gray-600 mb-8 uppercase tracking-widest">
        results
      </p>

      {/* Total Score */}
      <div className="mb-2">
        <span className="text-purple-400 mr-3">›</span>
        <span className="text-white text-xl">
          you agreed with{" "}
          <span className="text-purple-400 font-bold">
            {totalScore} of {totalQuestions}
          </span>{" "}
          statements ({percentage}%).
        </span>
      </div>

      {/* Comparison */}
      {averageScore !== null && (
        <p className="text-gray-500 text-sm mb-12 ml-6">
          # the average across {totalParticipants} participants is {averageScore}%.
        </p>
      )}

      {/* Radar Chart */}
      <div className="flex justify-center mb-12">
        <RadarChart data={radarData} />
      </div>

      {/* Category Breakdown with avg comparison */}
      <div className="flex flex-col gap-6 mb-12">
        {categoryScores.map(({ cat, catScore, catTotal }) => {
          const catPercentage = (catScore / catTotal) * 100
          const avg = avgByCategory[cat]
          return (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">{cat.toLowerCase()}</span>
                <span className="text-gray-600">
                  you: {Math.round(catPercentage)}%
                  {avg !== undefined && ` · avg: ${avg}%`}
                </span>
              </div>
              <div className="relative w-full bg-gray-900 h-1.5">
                {avg !== undefined && (
                  <div
                    className="absolute top-0 h-1.5 w-px bg-gray-600"
                    style={{ left: `${avg}%` }}
                  />
                )}
                <div
                  className="h-1.5 transition-all relative z-10"
                  style={{
                    width: `${catPercentage}%`,
                    background: getBarGradient(catPercentage),
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Gender Note */}
      {gender && genderNote[gender] && (
        <p className="text-xs text-gray-500 border-l-2 border-purple-900 pl-4 mb-8">
          {genderNote[gender]}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleShare}
          className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black transition-all text-sm tracking-widest uppercase"
        >
          {copied ? "[ copied! ]" : "[ share quiz ]"}
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 border border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-all text-sm tracking-widest uppercase"
        >
          [ restart ]
        </button>
      </div>
    </div>
  )
}
