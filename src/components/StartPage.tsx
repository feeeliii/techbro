type Props = {
  onStart: () => void
}

export default function StartPage({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-6xl font-bold mb-4 text-center">
        Am I a Tech Bro?
      </h1>
      <p className="text-gray-400 text-center mb-12 max-w-sm">
        23 questions. No bullshit.
      </p>
      <button
        onClick={onStart}
        className="px-10 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-all"
      >
        Let's find out
      </button>
    </div>
  )
}
