type RadarData = {
  label: string
  value: number
}

const shortLabels: Record<string, string> = {
  "Meritocracy": "meritocracy",
  "Techno-Solutionism": "solutionism",
  "Disruption": "disruption",
  "Cyber-Libertarianism": "libertarianism",
  "Hustle Culture": "hustle",
  "Privilege Blindness": "privilege",
  "Techno-Utopianism": "utopianism",
}

export default function RadarChart({ data }: { data: RadarData[] }) {
  const viewWidth = 500
  const viewHeight = 400
  const cx = viewWidth / 2
  const cy = viewHeight / 2
  const levels = 3
  const radius = 120
  const labelRadius = radius + 32

  const angleStep = (Math.PI * 2) / data.length
  const getX = (i: number, r: number) => cx + r * Math.cos(angleStep * i - Math.PI / 2)
  const getY = (i: number, r: number) => cy + r * Math.sin(angleStep * i - Math.PI / 2)

  const rings = Array.from({ length: levels }, (_, l) => {
    const r = (radius / levels) * (l + 1)
    const points = data.map((_, i) => `${getX(i, r)},${getY(i, r)}`).join(" ")
    return <polygon key={l} points={points} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
  })

  const axes = data.map((_, i) => (
    <line key={i} x1={cx} y1={cy} x2={getX(i, radius)} y2={getY(i, radius)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
  ))

  const dataPoints = data
    .map((d, i) => `${getX(i, radius * d.value)},${getY(i, radius * d.value)}`)
    .join(" ")

  const labels = data.map((d, i) => {
    const x = getX(i, labelRadius)
    const y = getY(i, labelRadius)
    const anchor = x < cx - 10 ? "end" : x > cx + 10 ? "start" : "middle"
    return (
      <text
        key={i} x={x} y={y}
        textAnchor={anchor}
        dominantBaseline="middle"
        fill="rgba(255,255,255,0.4)"
        fontSize="12"
        fontFamily="monospace"
      >
        {shortLabels[d.label] ?? d.label.toLowerCase()}
      </text>
    )
  })

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ maxWidth: "500px" }}
    >
      {rings}
      {axes}
      <polygon
        points={dataPoints}
        fill="rgba(167,139,250,0.15)"
        stroke="#a78bfa"
        strokeWidth="1.5"
      />
      {data.map((d, i) => (
        <circle
          key={i}
          cx={getX(i, radius * d.value)}
          cy={getY(i, radius * d.value)}
          r="3" fill="#a78bfa"
        />
      ))}
      {labels}
    </svg>
  )
}
