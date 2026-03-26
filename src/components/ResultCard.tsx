import { useState, useEffect, useRef } from "react"
import html2canvas from "html2canvas-pro"
import { supabase } from "../lib/supabase"
import type { GenderContext, Category } from "../data/questions"
import {
  questions,
  genderNote,
  categories,
  categoryDescriptions,
} from "../data/questions"
import RadarChart from "./RadarChart"
import CertificateDownload from "./CertificateDownload"

// ── Shared thresholds ─────────────────────────────────────────
export const THRESHOLD_LOW = 30
export const THRESHOLD_HIGH = 65

type Props = {
  answers: number[]
  gender: GenderContext | null
}

type AvgData = Record<string, number>

function getBarGradient(percentage: number): string {
  if (percentage === 0) return "rgba(255,255,255,0.1)"
  if (percentage <= THRESHOLD_LOW) return "linear-gradient(135deg, #34d399, #60a5fa)"
  if (percentage <= THRESHOLD_HIGH) return "linear-gradient(135deg, #60a5fa, #a78bfa)"
  return "linear-gradient(135deg, #a78bfa, #ec4899, #f97316)"
}

function getScoreColor(percentage: number): string {
  if (percentage <= THRESHOLD_LOW) return "#34d399"
  if (percentage <= THRESHOLD_HIGH) return "#a78bfa"
  return "#ec4899"
}

function getScoreBg(percentage: number): string {
  if (percentage <= THRESHOLD_LOW) return "rgba(52,211,153,0.15)"
  if (percentage <= THRESHOLD_HIGH) return "rgba(167,139,250,0.15)"
  return "rgba(236,72,153,0.15)"
}

function adjustAnswers(rawAnswers: number[]): number[] {
  return questions.map((q, i) =>
    q.reversed ? 1 - rawAnswers[i] : rawAnswers[i]
  )
}

const PERCENT_THRESHOLD = 30

export default function ResultCard({ answers, gender }: Props) {
  const [totalParticipants, setTotalParticipants] = useState<number | null>(null)
  const [averageScore, setAverageScore] = useState<number | null>(null)
  const [avgByCategory, setAvgByCategory] = useState<AvgData>({})
  const [copied, setCopied] = useState(false)
  const [verdictDistribution, setVerdictDistribution] = useState<{
    techBro: number
    tendencies: number
    notTechBro: number
    techBroAbs: number
    tendenciesAbs: number
    notTechBroAbs: number
  } | null>(null)
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const adjusted = adjustAnswers(answers)
  const totalScore = adjusted.reduce((a, b) => a + b, 0)
  const totalQuestions = questions.length
  const percentage = Math.round((totalScore / totalQuestions) * 100)

  const categoryScores = categories.map((cat) => {
    const catQuestions = questions.filter((q) => q.category === cat)
    const catScore = catQuestions.reduce(
      (sum, q) => sum + adjusted[q.id - 1],
      0
    )
    return { cat, catScore, catTotal: catQuestions.length }
  })

  const radarData = categoryScores.map(({ cat, catScore, catTotal }) => ({
    label: cat,
    value: catScore / catTotal,
  }))

  const shareRef = useRef<HTMLDivElement>(null)

  const verdictLabel =
    percentage > THRESHOLD_HIGH
      ? "tech bro"
      : percentage > THRESHOLD_LOW
      ? "tendencies"
      : "not a tech bro"

  const usePercent =
    totalParticipants !== null && totalParticipants >= PERCENT_THRESHOLD

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
                data.reduce((a, row) => {
                  const rowAdjusted = adjustAnswers(row.answers as number[])
                  return a + rowAdjusted.reduce((s, v) => s + v, 0)
                }, 0) / data.length
              setAverageScore(Math.round((avg / questions.length) * 100))

              const catAvgs: AvgData = {}
              categories.forEach((cat) => {
                const catQuestions = questions.filter((q) => q.category === cat)
                const catTotal = catQuestions.length
                const sum = data.reduce((acc, row) => {
                  const rowAnswers = row.answers as number[]
                  const catScore = catQuestions.reduce(
                    (s, q) =>
                      s +
                      (q.reversed
                        ? 1 - (rowAnswers[q.id - 1] ?? 0)
                        : (rowAnswers[q.id - 1] ?? 0)),
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
              const getScore = (row: { answers: unknown }) => {
                const rowAdjusted = adjustAnswers(row.answers as number[])
                return (
                  (rowAdjusted.reduce((s, v) => s + v, 0) / questions.length) *
                  100
                )
              }
              const techBroAbs = data.filter((r) => getScore(r) > THRESHOLD_HIGH).length
              const tendenciesAbs = data.filter((r) => {
                const p = getScore(r)
                return p > THRESHOLD_LOW && p <= THRESHOLD_HIGH
              }).length
              const notTechBroAbs = data.filter(
                (r) => getScore(r) <= THRESHOLD_LOW
              ).length
              setVerdictDistribution({
                techBro: Math.round((techBroAbs / total) * 100),
                tendencies: Math.round((tendenciesAbs / total) * 100),
                notTechBro: Math.round((notTechBroAbs / total) * 100),
                techBroAbs,
                tendenciesAbs,
                notTechBroAbs,
              })
            }
          })
      })
  }, [])

  async function handleShare() {
    supabase.from("share_clicks").insert({ percentage }).then()
    
    const text = `I scored ${percentage}% on the Tech Bro Assessment. Verdict: ${verdictLabel}. Take the quiz:`
    const url = window.location.origin

    if (navigator.share && shareRef.current) {
      try {
        const canvas = await html2canvas(shareRef.current, {
          backgroundColor: "#111",
          scale: 2,
        })

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/png")
        )

        if (blob) {
          const file = new File([blob], "tech-bro-result.png", { type: "image/png" })

          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({ title: "Am I a Tech Bro?", text, url, files: [file] })
            return
          }
        }

        await navigator.share({ title: "Am I a Tech Bro?", text, url })
        return
      } catch {
        // user cancelled or share failed, fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard failed silently
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-8 py-16 max-w-2xl mx-auto font-mono">

      {/* Verstecktes div nur für Screenshot */}
    <div
      ref={shareRef}
      style={{
        position: "absolute",
        left: "-9999px",
        padding: "32px",
        background: "#111",
        width: "700px",
        fontFamily: "monospace",
      }}
    >
      <p style={{ color: "#9ca3af", fontSize: "1rem", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.15em" }}>
        your score
      </p>
      <div style={{ marginBottom: "12px" }}>
        <span style={{ color: "#a78bfa", marginRight: "14px", fontSize: "1.5rem" }}>›</span>
        <span style={{ color: "#fff", fontSize: "1.75rem" }}>
          You scored{" "}
          <span style={{ color: getScoreColor(percentage), backgroundColor: getScoreBg(percentage), fontWeight: "bold", padding: "4px 12px", borderRadius: "6px" }}>
            {percentage}%
          </span>
        </span>
      </div>
      <p style={{ color: "#d1d5db", fontSize: "1.1rem", marginLeft: "28px", marginBottom: "48px" }}>
        That puts you in the "{verdictLabel}" range.
      </p>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
        <RadarChart data={radarData} />
      </div>
      {averageScore !== null && totalParticipants !== null && (
        <p style={{ color: "#9ca3af", fontSize: "1rem", textAlign: "center" }}>
          Average score of {totalParticipants} participants: {averageScore}%
        </p>
      )}
    </div>


      {/* ── YOUR SCORE ──*/}
      <p className="text-xs text-gray-600 mb-8 uppercase tracking-widest">
        your score
      </p>

      {/* Score */}
      <div className="mb-2">
        <span className="text-purple-400 mr-3">›</span>
        <span className="text-white text-xl">
          You scored{" "}
          <span
            className="font-bold px-2 py-0.5 rounded"
            style={{
              color: getScoreColor(percentage),
              backgroundColor: getScoreBg(percentage),
            }}
          >
            {percentage}%
          </span>
        </span>
      </div>

      {/* Verdict */}
      <p className="text-gray-300 text-sm ml-6 mb-10">
        That puts you in the "{verdictLabel}" range.
      </p>

      {/* Gender Note */}
      {gender && genderNote[gender] && (
        <p className="text-xs text-gray-500 border-l-2 border-purple-900 pl-4 mb-8">
          {genderNote[gender]}
        </p>
      )}

      {/* Radar Chart */}
      <div className="flex justify-center mb-12">
        <RadarChart data={radarData} />
      </div>

      {/* Category Breakdown */}
      <div className="flex flex-col gap-6 mb-16">
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
                    className="text-[24px] text-gray-400 transition-transform duration-200"
                    style={{
                      display: "inline-block",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    ▾
                  </span>
                </button>
                <span className="text-gray-600">
                  {Math.round(catPercentage)}%
                </span>
              </div>

              {isOpen && desc && (
                <div className="text-xs mb-3 ml-4 border-l border-gray-700 pl-3 flex flex-col gap-2">
                  <p className="text-gray-500">
                    "{desc.text}"
                    <span className="text-gray-600 ml-1">— {desc.source}</span>
                  </p>
                  <p className="text-gray-400 italic">{desc.critique}</p>
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

      {/* ── EVERYONE ELSE ──────────────────────────── */}
      {verdictDistribution && totalParticipants !== null && (
        <div className="border-t border-gray-800 pt-8 mb-12">
          <p className="text-xs text-gray-600 mb-6 uppercase tracking-widest">
            everyone else · {totalParticipants} participants
          </p>

          {averageScore !== null && (
            <p className="text-gray-400 text-sm mb-6">
              Average score:{" "}
              <span className="text-gray-300">{averageScore}%</span>
            </p>
          )}

          {/* Distribution */}
          <div className="flex flex-col gap-3">
            {[
              {
                label: "tech bro",
                pct: verdictDistribution.techBro,
                abs: verdictDistribution.techBroAbs,
                color: "#ec4899",
              },
              {
                label: "tendencies",
                pct: verdictDistribution.tendencies,
                abs: verdictDistribution.tendenciesAbs,
                color: "#a78bfa",
              },
              {
                label: "not a tech bro",
                pct: verdictDistribution.notTechBro,
                abs: verdictDistribution.notTechBroAbs,
                color: "#34d399",
              },
            ].map((v) => {
              const barWidth = usePercent
                ? v.pct
                : totalParticipants
                  ? Math.round((v.abs / totalParticipants) * 100)
                  : 0

              return (
                <div key={v.label} className="flex items-center gap-3">
                  <span
                    className="text-sm w-10 text-right tabular-nums"
                    style={{ color: v.color }}
                  >
                    {usePercent ? `${v.pct}%` : v.abs}
                  </span>
                  <div className="flex-1 bg-gray-900 h-1.5">
                    <div
                      className="h-1.5 transition-all"
                      style={{
                        width: `${barWidth}%`,
                        background: v.color,
                        opacity: 0.7,
                      }}
                    />
                  </div>
                  <span className="text-gray-500 text-xs w-24">
                    {v.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={handleShare}
          className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black transition-all text-sm tracking-widest uppercase whitespace-nowrap"
        >
          {copied ? "[ copied! ]" : "[ share ]"}
        </button>
        <CertificateDownload percentage={percentage} verdictLabel={verdictLabel} />
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 border border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-all text-sm tracking-widest uppercase whitespace-nowrap"
        >
          [ restart ]
        </button>
      </div>
    </div>
  )
}
