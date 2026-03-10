import { useEffect } from "react"
import { supabase } from "../lib/supabase"
import type { GenderContext } from "../data/questions"
import { questions, genderNote, categories } from "../data/questions"

type Props = {
  answers: number[]
  gender: GenderContext | null
}

export default function ResultCard({ answers, gender }: Props) {
  const totalScore = answers.reduce((a, b) => a + b, 0)
  const totalQuestions = questions.length

  const categoryScores = categories.map((cat) => {
    const catQuestions = questions.filter((q) => q.category === cat)
    const catAnswers = catQuestions.map((q) => answers[q.id - 1])
    const catScore = catAnswers.reduce((a, b) => a + b, 0)
    return { cat, catScore, catTotal: catQuestions.length }
  })

  useEffect(() => {
    supabase.from("results").insert({
        gender_context: gender,
        total_score: totalScore,
        answers: answers,
    }).then(({ error }) => {
        console.log("Supabase error:", error)
    })
    }, [])


  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-16 max-w-xl mx-auto">

      {/* Total Score */}
      <h1 className="text-4xl font-bold mb-2">
        {totalScore} / {totalQuestions}
      </h1>
      <p className="text-gray-400 mb-12">
        {Math.round((totalScore / totalQuestions) * 100)}% Tech Bro agreement
      </p>

      {/* Category Breakdown */}
      <div className="w-full flex flex-col gap-4">
        {categoryScores.map(({ cat, catScore, catTotal }) => (
          <div key={cat}>
            <div className="flex justify-between text-sm mb-1">
              <span>{cat}</span>
              <span>{catScore} / {catTotal}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${(catScore / catTotal) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Gender Note */}
      {gender && genderNote[gender] && (
        <p className="mt-12 text-sm text-gray-400 text-center">
          {genderNote[gender]}
        </p>
      )}

    </div>
  )
}
