import { useState } from "react"
import Quiz from "./components/Quizz"
import StartPage from "./components/StartPage"

function App() {
  const [started, setStarted] = useState(false)

  return (
    <main className="min-h-screen bg-black text-white">
      {started ? <Quiz /> : <StartPage onStart={() => setStarted(true)} />}
    </main>
  )
}

export default App
