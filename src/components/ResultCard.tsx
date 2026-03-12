import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import type { GenderContext } from "../data/questions"
import { questions, genderNote, categories, categoryDescriptions } from "../data/questions"
import type { Category } from "../data/questions"
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
  const [verdictDistribution, setVerdictDistribution] = useState<{
    techBro: number
    tendencies: number
    notTechBro: number
  } | null>(null)
  const [openCategory, setOpenCategory] = useState<string | null>(null)

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
                catAvgs[cat] = Math.round(
                  (sum / (data.length * catTotal)) * 100
                )
              })
              setAvgByCategory(catAvgs)

              const total = data.length
              const techBro = data.filter(
                (r) => (r.total_score / questions.length) * 100 > 65
              ).length
              const tendencies = data.filter((r) => {
                const p = (r.total_score / questions.length) * 100
                return p > 30 && p <= 65
              }).length
              const notTechBro = data.filter(
                (r) => (r.total_score / questions.length) * 100 <= 30
              ).length
              setVerdictDistribution({
                techBro: Math.round((techBro / total) * 100),
                tendencies: Math.round((tendencies / total) * 100),
                notTechBro: Math.round((notTechBro / total) * 100),
              })
            }
          })
      })
  }, [])

  function handleShare() {
    const text = `Am I a Tech Bro? ${totalQuestions} statements. Agree or Disagree. Take the quiz:`
    const url = window.location.origin

    if (navigator.share) {
      navigator.share({ title: "Am I a Tech Bro?", text, url })
    } else {
      navigator.clipboard.writeText(`${text} ${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const verdictLabel =
    percentage > 65
      ? '"tech bro"'
      : percentage > 30
      ? '"tendencies"'
      : '"not a tech bro"'

  return (
    <div className="flex flex-col min-h-screen px-8 py-16 max-w-2xl mx-auto font-mono">
      {/* Header */}
      <p className="text-xs text-gray-600 mb-8 uppercase tracking-widest">
        results
      </p>

      {/* Total Score */}
      <div className="mb-4">
        <span className="text-purple-400 mr-3">›</span>
        <span className="text-white text-xl">
          You scored{" "}
          <span className="text-purple-400 font-bold">{percentage}%</span>.
        </span>
      </div>

      {/* Verdict Label */}
      <div className="mb-2 ml-6">
        <span className="text-gray-300 text-sm">
          That puts you in the {verdictLabel} range.
        </span>
      </div>

      {/* Average Score */}
      {averageScore !== null && (
        <p className="text-gray-500 text-sm mb-8 ml-6">
          The average is {averageScore}%.
        </p>
      )}

      {/* Verdict Distribution */}
      {verdictDistribution && totalParticipants !== null && (
        <div className="mb-12 ml-6 font-mono text-xs flex flex-col gap-1 border-t border-gray-800 pt-4">
          <p className="mb-2 text-gray-600 uppercase tracking-widest text-xs">
            among {totalParticipants} participants
          </p>
          <p>
            <span className="text-purple-400">
              {verdictDistribution.techBro}%
            </span>{" "}
            tech bro
          </p>
          <p>
            <span className="text-blue-400">
              {verdictDistribution.tendencies}%
            </span>{" "}
            tendencies
          </p>
          <p>
            <span className="text-emerald-400">
              {verdictDistribution.notTechBro}%
            </span>{" "}
            not a tech bro
          </p>
        </div>
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
          const isOpen = openCategory === cat
          const desc = categoryDescriptions[cat as Category]
          return (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-2">
                <button
                  onClick={() => setOpenCategory(isOpen ? null : cat)}
                  className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors text-left"
                >
                  {cat.toLowerCase()}
                  <span
                    className="text-[20px] text-gray-400 transition-transform duration-200"
                    style={{
                      display: "inline-block",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    ▾
                  </span>
                </button>

                <span className="text-gray-600">
                  you: {Math.round(catPercentage)}%
                  {avg !== undefined && ` · avg: ${avg}%`}
                </span>
              </div>

              {/* Definition Accordion */}
              {isOpen && desc && (
                <div className="text-xs mb-3 ml-4 border-l border-gray-700 pl-3 flex flex-col gap-2">
                  <p className="text-gray-500">
                    "{desc.text}"
                    <span className="text-gray-600 ml-1">— {desc.source}</span>
                  </p>
                  <p className="text-gray-400 italic">
                    {desc.critique}
                  </p>
                </div>
              )}

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
