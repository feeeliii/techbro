import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Quiz from "./components/Quizz"
import StartPage from "./components/StartPage"
import Footer from "./components/Footer"
import Impressum from "./components/Impressum"
import Datenschutz from "./components/Datenschutz"

function Home() {
  const [started, setStarted] = useState(false)
  return started ? <Quiz /> : <StartPage onStart={() => setStarted(true)} />
}

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-black text-white flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default App
