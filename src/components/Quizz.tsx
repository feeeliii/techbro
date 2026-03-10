import { useState } from "react"
import ResultCard from "./ResultCard"
import { questions, genderQuestion } from "../data/questions"
import type { GenderContext } from "../data/questions"
import QuestionCard from "./QuestionCard"

export default function Quiz() {
  const [step, setStep] = useState<"gender" | "quiz" | "result">("gender")
  const [_gender, setGender] = useState<GenderContext | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [current, setCurrent] = useState(0)

  function handleGender(agreed: boolean) {
    setGender(agreed ? "man" : "not-man")
    setStep("quiz")
  }

  function handleAnswer(agreed: boolean) {
    const newAnswers = [...answers, agreed ? 1 : 0]
    setAnswers(newAnswers)

    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      setStep("result")
    }
  }

  if (step === "gender") {
    return (
      <QuestionCard
        question={{ id: 0, text: genderQuestion.text, category: "", source: "" }}
        current={0}
        total={questions.length}
        onAnswer={handleGender}
      />
    )
  }

  if (step === "quiz") {
    return (
      <QuestionCard
        question={questions[current]}
        current={current + 1}
        total={questions.length}
        onAnswer={handleAnswer}
      />
    )
  }

    return <ResultCard answers={answers} gender={_gender} />
}