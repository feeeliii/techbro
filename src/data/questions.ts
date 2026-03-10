export type GenderContext = "man" | "not-man"

export const genderQuestion = {
  text: "I identify as a man.",
}

export type Question = {
  id: number
  text: string
  category: string
  source: string
}

export const questions: Question[] = [
  // Meritocracy
  {
    id: 1,
    text: "If you're truly talented and work hard, you'll succeed – regardless of background, gender, or race.",
    category: "Meritocracy",
    source: "Noble & Roberts, 2019",
  },
  {
    id: 2,
    text: "Diversity programs and quotas are actually unfair because they undermine merit.",
    category: "Meritocracy",
    source: "Noble & Roberts, 2019",
  },
  {
    id: 3,
    text: "If someone doesn't make it in the tech industry, it's usually their own fault, not the system's.",
    category: "Meritocracy",
    source: "Noble & Roberts, 2019",
  },

  // Techno-Solutionism
  {
    id: 4,
    text: "Most societal problems – education, healthcare, climate – have a technological solution.",
    category: "Techno-Solutionism",
    source: "Morozov, 2014",
  },
  {
    id: 5,
    text: "If an app or platform can't solve a problem, it just hasn't been built well enough yet.",
    category: "Techno-Solutionism",
    source: "Morozov, 2014",
  },
  {
    id: 6,
    text: "Political processes are too slow – technology can drive change faster and more effectively.",
    category: "Techno-Solutionism",
    source: "Levina & Hasinoff, 2017",
  },

  // Disruption
  {
    id: 7,
    text: "Sometimes existing industries and institutions need to be destroyed so something better can emerge.",
    category: "Disruption",
    source: "Daub, 2020",
  },
  {
    id: 8,
    text: "Taxis, hotels, banks – these industries deserved to be disrupted.",
    category: "Disruption",
    source: "Levina & Hasinoff, 2017",
  },
  {
    id: 9,
    text: "If my product eliminates existing jobs, that's an inevitable price of progress.",
    category: "Disruption",
    source: "Daub, 2020",
  },

  // Cyber-Libertarianism
  {
    id: 10,
    text: "Government regulation slows down innovation and ultimately hurts everyone.",
    category: "Cyber-Libertarianism",
    source: "VTech, Silicon Valley Ideologies",
  },
  {
    id: 11,
    text: "The market solves problems better than laws – bad products simply don't survive.",
    category: "Cyber-Libertarianism",
    source: "VTech, Silicon Valley Ideologies",
  },
  {
    id: 12,
    text: "I trust tech founders more than politicians when it comes to solving big problems.",
    category: "Cyber-Libertarianism",
    source: "USC, Silicon Valley-isms",
  },

  // Hustle Culture
  {
    id: 13,
    text: "I admire founders who work 80+ hours a week – that shows real commitment.",
    category: "Hustle Culture",
    source: "Silicon Valley Paradox, 2023",
  },
  {
    id: 14,
    text: "I regularly track personal metrics like sleep, steps, or productivity.",
    category: "Hustle Culture",
    source: "Silicon Valley Paradox, 2023",
  },
  {
    id: 15,
    text: "Work-life balance is a concept for people who aren't passionate enough about their work.",
    category: "Hustle Culture",
    source: "Silicon Valley Paradox, 2023",
  },
  {
    id: 16,
    text: "I've tried biohacking trends like dopamine fasting, cold exposure, nootropics, or intermittent fasting as a productivity hack.",
    category: "Hustle Culture",
    source: "Silicon Valley Paradox, 2023",
  },

  // Privilege Blindness
  {
    id: 17,
    text: "Tech is one of the fairest industries – code is code, no matter who writes it.",
    category: "Privilege Blindness",
    source: "Noble & Roberts, 2019",
  },
  {
    id: 18,
    text: "Discussions about systemic racism or sexism in the tech industry are overblown.",
    category: "Privilege Blindness",
    source: "Noble & Roberts, 2019",
  },
  {
    id: 19,
    text: "If AI systems have bias, that's a technical bug, not a societal issue.",
    category: "Privilege Blindness",
    source: "Noble & Roberts, 2019",
  },
  {
    id: 20,
    text: "Existential AI risks like superintelligence matter more than current problems like algorithmic discrimination.",
    category: "Privilege Blindness",
    source: "Noble & Roberts, 2019",
  },

  // Techno-Utopianism
  {
    id: 21,
    text: "Technology will solve most of humanity's current problems within the next 50 years.",
    category: "Techno-Utopianism",
    source: "VTech, Silicon Valley Ideologies",
  },
  {
    id: 22,
    text: "Mind uploading, radical life extension, or Mars colonies are realistic goals, not science fiction.",
    category: "Techno-Utopianism",
    source: "USC, Silicon Valley-isms",
  },
  {
    id: 23,
    text: "Crypto and decentralized systems can eventually replace institutions like banks or governments.",
    category: "Techno-Utopianism",
    source: "USC, Silicon Valley-isms",
  },
]

export const categories = [
  "Meritocracy",
  "Techno-Solutionism",
  "Disruption",
  "Cyber-Libertarianism",
  "Hustle Culture",
  "Privilege Blindness",
  "Techno-Utopianism",
] as const

export type Category = typeof categories[number]

export const categoryInfo: Record<Category, { source: string }> = {
  "Meritocracy": { source: "Noble & Roberts, 2019" },
  "Techno-Solutionism": { source: "Morozov, 2014" },
  "Disruption": { source: "Daub, 2020" },
  "Cyber-Libertarianism": { source: "VTech, Silicon Valley Ideologies" },
  "Hustle Culture": { source: "Silicon Valley Paradox, 2023" },
  "Privilege Blindness": { source: "Noble & Roberts, 2019" },
  "Techno-Utopianism": { source: "USC, Silicon Valley-isms" },
}

export const genderNote: Record<GenderContext, string> = {
  "man": "",
  "not-man": "Note: The term 'Tech Bro' describes a structurally male phenomenon. Your results reflect how much you've internalized this ideology – not whether the system was built for you. It wasn't.",
}