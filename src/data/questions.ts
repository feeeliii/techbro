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
    source:
      "Noble, S. U., & Roberts, S. T. (2019). Technological elites, the meritocracy, and postracial myths in Silicon Valley. In R. Mukherjee, S. Banet-Weiser, & H. Gray (Eds.), Racism postrace (pp. 113–130). Duke University Press. https://doi.org/10.1215/9781478003250",
  },
  {
    id: 2,
    text: "Diversity programs and quotas are actually unfair because they undermine merit.",
    category: "Meritocracy",
    source:
      "Noble, S. U., & Roberts, S. T. (2019). Technological elites, the meritocracy, and postracial myths in Silicon Valley. In R. Mukherjee, S. Banet-Weiser, & H. Gray (Eds.), Racism postrace (pp. 113–130). Duke University Press. https://doi.org/10.1215/9781478003250",
  },
  {
    id: 3,
    text: "If someone doesn't make it in the tech industry, it's usually their own fault, not the system's.",
    category: "Meritocracy",
    source:
      "Noble, S. U., & Roberts, S. T. (2019). Technological elites, the meritocracy, and postracial myths in Silicon Valley. In R. Mukherjee, S. Banet-Weiser, & H. Gray (Eds.), Racism postrace (pp. 113–130). Duke University Press. https://doi.org/10.1215/9781478003250",
  },

  // Techno-Solutionism
  {
    id: 4,
    text: "Most societal problems – education, healthcare, climate – have a technological solution.",
    category: "Techno-Solutionism",
    source:
      "Levina, M., & Hasinoff, A. A. (2017). The Silicon Valley ethos: Tech industry products, discourses, and practices. Television & New Media, 18(6), 489–495. https://doi.org/10.1177/1527476416680454\n\nQuandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },
  {
    id: 5,
    text: "If an app or platform can't solve a problem, it just hasn't been built well enough yet.",
    category: "Techno-Solutionism",
    source:
      "Levina, M., & Hasinoff, A. A. (2017). The Silicon Valley ethos: Tech industry products, discourses, and practices. Television & New Media, 18(6), 489–495. https://doi.org/10.1177/1527476416680454\n\nQuandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },
  {
    id: 6,
    text: "Political processes are too slow – technology can drive change faster and more effectively.",
    category: "Techno-Solutionism",
    source:
      "Levina, M., & Hasinoff, A. A. (2017). The Silicon Valley ethos: Tech industry products, discourses, and practices. Television & New Media, 18(6), 489–495. https://doi.org/10.1177/1527476416680454\n\nQuandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },

  // Disruption
  {
    id: 7,
    text: "Sometimes existing industries and institutions need to be destroyed so something better can emerge.",
    category: "Disruption",
    source:
      "Daub, A. (2020). What tech calls thinking: An inquiry into the intellectual bedrock of Silicon Valley. Farrar, Straus and Giroux.",
  },
  {
    id: 8,
    text: "Taxis, hotels, banks – these industries deserved to be disrupted.",
    category: "Disruption",
    source:
      "Daub, A. (2020). What tech calls thinking: An inquiry into the intellectual bedrock of Silicon Valley. Farrar, Straus and Giroux.",
  },
  {
    id: 9,
    text: "If my product eliminates existing jobs, that's an inevitable price of progress.",
    category: "Disruption",
    source:
      "Daub, A. (2020). What tech calls thinking: An inquiry into the intellectual bedrock of Silicon Valley. Farrar, Straus and Giroux.",
  },

  // Cyber-Libertarianism
  {
    id: 10,
    text: "Government regulation slows down innovation and ultimately hurts everyone.",
    category: "Cyber-Libertarianism",
    source:
      "Golumbia, D. (2024). Cyberlibertarianism: The right-wing politics of digital technology. University of Minnesota Press.",
  },
  {
    id: 11,
    text: "The market solves problems better than laws – bad products simply don't survive.",
    category: "Cyber-Libertarianism",
    source:
      "Golumbia, D. (2024). Cyberlibertarianism: The right-wing politics of digital technology. University of Minnesota Press.",
  },
  {
    id: 12,
    text: "I trust tech founders more than politicians when it comes to solving big problems.",
    category: "Cyber-Libertarianism",
    source:
      "Golumbia, D. (2024). Cyberlibertarianism: The right-wing politics of digital technology. University of Minnesota Press.",
  },

  // Hustle Culture
  {
    id: 13,
    text: "I admire founders who work 80+ hours a week – that shows real commitment.",
    category: "Hustle Culture",
    source:
      "Quandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },
  {
    id: 14,
    text: "I regularly track personal metrics like sleep, steps, or productivity.",
    category: "Hustle Culture",
    source:
      "Quandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },
  {
    id: 15,
    text: "Work-life balance is a concept for people who aren't passionate enough about their work.",
    category: "Hustle Culture",
    source:
      "Quandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },
  {
    id: 16,
    text: "I've tried biohacking trends like dopamine fasting, cold exposure, nootropics, or intermittent fasting as a productivity hack.",
    category: "Hustle Culture",
    source:
      "Quandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },

  // Privilege Blindness
  {
    id: 17,
    text: "Tech is one of the fairest industries – code is code, no matter who writes it.",
    category: "Privilege Blindness",
    source:
      "Noble, S. U., & Roberts, S. T. (2019). Technological elites, the meritocracy, and postracial myths in Silicon Valley. In R. Mukherjee, S. Banet-Weiser, & H. Gray (Eds.), Racism postrace (pp. 113–130). Duke University Press. https://doi.org/10.1215/9781478003250",
  },
  {
    id: 18,
    text: "Discussions about systemic racism or sexism in the tech industry are overblown.",
    category: "Privilege Blindness",
    source:
      "Noble, S. U., & Roberts, S. T. (2019). Technological elites, the meritocracy, and postracial myths in Silicon Valley. In R. Mukherjee, S. Banet-Weiser, & H. Gray (Eds.), Racism postrace (pp. 113–130). Duke University Press. https://doi.org/10.1215/9781478003250",
  },
  {
    id: 19,
    text: "If AI systems have bias, that's a technical bug, not a societal issue.",
    category: "Privilege Blindness",
    source:
      "Noble, S. U. (2018). Algorithms of oppression: How search engines reinforce racism. New York University Press.",
  },
  {
    id: 20,
    text: "Existential AI risks like superintelligence matter more than current problems like algorithmic discrimination.",
    category: "Privilege Blindness",
    source:
      "Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers of stochastic parrots: Can language models be too big? 🦜. Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency, 610–623. https://doi.org/10.1145/3442188.3445922",
  },

  // Techno-Utopianism
  {
    id: 21,
    text: "Technology will solve most of humanity's current problems within the next 50 years.",
    category: "Techno-Utopianism",
    source:
      "Gebru, T., & Torres, É. P. (2024). The TESCREAL bundle: Eugenics and the promise of utopia through artificial general intelligence. First Monday, 29(4). https://doi.org/10.5210/fm.v29i4.13636",
  },
  {
    id: 22,
    text: "Mind uploading, radical life extension, or Mars colonies are realistic goals, not science fiction.",
    category: "Techno-Utopianism",
    source:
      "Gebru, T., & Torres, É. P. (2024). The TESCREAL bundle: Eugenics and the promise of utopia through artificial general intelligence. First Monday, 29(4). https://doi.org/10.5210/fm.v29i4.13636",
  },
  {
    id: 23,
    text: "Developing superintelligent AI should be humanity's top priority, even if it requires significant sacrifice.",
    category: "Techno-Utopianism",
    source:
      "Gebru, T., & Torres, É. P. (2024). The TESCREAL bundle: Eugenics and the promise of utopia through artificial general intelligence. First Monday, 29(4). https://doi.org/10.5210/fm.v29i4.13636",
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

export type Category = (typeof categories)[number]

export const categoryInfo: Record<Category, { source: string }> = {
  Meritocracy: { source: "Noble & Roberts, 2019" },
  "Techno-Solutionism": {
    source: "Levina & Hasinoff, 2017; Quandt & Klapproth, 2024",
  },
  Disruption: { source: "Daub, 2020" },
  "Cyber-Libertarianism": { source: "Golumbia, 2024" },
  "Hustle Culture": { source: "Quandt & Klapproth, 2024" },
  "Privilege Blindness": {
    source: "Noble & Roberts, 2019; Noble, 2018; Bender et al., 2021",
  },
  "Techno-Utopianism": { source: "Gebru & Torres, 2024" },
}

export const genderNote: Record<GenderContext, string> = {
  man: "",
  "not-man":
    "Note: The term 'Tech Bro' describes a structurally gendered phenomenon – built by and for men. Your results reflect how much you've internalized their ideas – not whether the system was built for you. It wasn't.",
}