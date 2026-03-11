import { useState } from "react"
import ResultCard from "./ResultCard"
import LoadingScreen from "./LoadingScreen"
import RevealScreen from "./RevealScreen"
import { questions, genderQuestion } from "../data/questions"
import type { GenderContext } from "../data/questions"
import QuestionCard from "./QuestionCard"

type Step = "gender" | "quiz" | "loading" | "reveal" | "result"

export default function Quiz() {
  const [step, setStep] = useState<Step>("gender")
  const [_gender, setGender] = useState<GenderContext | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [current, setCurrent] = useState(0)
  const [resultEntering, setResultEntering] = useState(true)

  const totalScore = answers.reduce((a, b) => a + b, 0)
  const percentage = Math.round((totalScore / questions.length) * 100)

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
      setStep("loading")
    }
  }

  function handleRevealDone() {
    setResultEntering(true)
    setStep("result")
    // Trigger slide-in after mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setResultEntering(false)
      })
    })
  }

  if (step === "gender") {
    return (
        <QuestionCard
        question={{ id: 0, text: genderQuestion.text, category: "", source: "" }}
        current={0}
        total={questions.length}
        onAnswer={handleGender}
        labels={{ yes: "yes", no: "no" }}
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

  if (step === "loading") {
    return <LoadingScreen onDone={() => setStep("reveal")} />
  }

  if (step === "reveal") {
    return (
      <RevealScreen
        percentage={percentage}
        onContinue={handleRevealDone}
      />
    )
  }

  return (
    <div
      style={{
        transform: resultEntering ? "translateY(100vh)" : "translateY(0)",
        transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <ResultCard answers={answers} gender={_gender} />
    </div>
  )
}
