export type GenderContext = "man" | "not-man"

export const genderQuestion = {
  text: "I am a man.",
}

export type Question = {
  id: number
  text: string
  category: string
  source: string
  reversed?: boolean
}

export const questions: Question[] = [
  // Meritocracy
  {
    id: 1,
    text: "Your background, gender, and race still significantly shape your chances of success in tech – no matter how talented you are.",
    category: "Meritocracy",
    reversed: true,
    source:
      "Noble, S. U., & Roberts, S. T. (2019). Technological elites, the meritocracy, and postracial myths in Silicon Valley. In R. Mukherjee, S. Banet-Weiser, & H. Gray (Eds.), Racism postrace (pp. 113–130). Duke University Press. https://doi.org/10.1215/9781478003250",
  },
  {
    id: 2,
    text: "Venture capital naturally flows to the best ideas and the smartest founders.",
    category: "Meritocracy",
    source:
      "Malmström, M., Johansson, J., & Wincent, J. (2017). Gender stereotypes and venture support decisions: How governmental venture capitalists socially construct entrepreneurs' potential. Entrepreneurship Theory and Practice, 41(5), 833–860. https://doi.org/10.1111/etap.12275",
  },
  {
    id: 3,
    text: "Diversity programs and quotas are actually unfair because they undermine merit.",
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
    text: "Democratic processes may be slow, but they're how societies should make decisions – technology shouldn't bypass them.",
    category: "Techno-Solutionism",
    reversed: true,
    source:
      "Levina, M., & Hasinoff, A. A. (2017). The Silicon Valley ethos: Tech industry products, discourses, and practices. Television & New Media, 18(6), 489–495. https://doi.org/10.1177/1527476416680454\n\nQuandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },

  // Disruption
  {
    id: 6,
    text: "Sometimes existing industries and institutions need to be destroyed so something better can emerge.",
    category: "Disruption",
    source:
      "Daub, A. (2020). What tech calls thinking: An inquiry into the intellectual bedrock of Silicon Valley. Farrar, Straus and Giroux.",
  },
  {
    id: 7,
    text: "If my product eliminates existing jobs, that's an inevitable price of progress.",
    category: "Disruption",
    source:
      "Daub, A. (2020). What tech calls thinking: An inquiry into the intellectual bedrock of Silicon Valley. Farrar, Straus and Giroux.",
  },

  // Cyber-Libertarianism
  {
    id: 8,
    text: "Government regulation slows down innovation and ultimately hurts everyone.",
    category: "Cyber-Libertarianism",
    source:
      "Golumbia, D. (2024). Cyberlibertarianism: The right-wing politics of digital technology. University of Minnesota Press.",
  },
  {
    id: 9,
    text: "I trust tech founders more than politicians when it comes to solving big problems.",
    category: "Cyber-Libertarianism",
    source:
      "Golumbia, D. (2024). Cyberlibertarianism: The right-wing politics of digital technology. University of Minnesota Press.",
  },
  {
    id: 10,
    text: "Tech platforms have become too powerful to self-regulate – we need strong public oversight.",
    category: "Cyber-Libertarianism",
    reversed: true,
    source:
      "Golumbia, D. (2024). Cyberlibertarianism: The right-wing politics of digital technology. University of Minnesota Press.",
  },

  // Hustle Culture
  {
    id: 11,
    text: "I admire founders who work 80+ hours a week – that shows real commitment.",
    category: "Hustle Culture",
    source:
      "Quandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },
  {
    id: 12,
    text: "Work-life balance is a concept for people who aren't passionate enough about their work.",
    category: "Hustle Culture",
    source:
      "Quandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },
  {
    id: 13,
    text: "I've tried biohacking trends like dopamine fasting, cold exposure, nootropics, or intermittent fasting as a productivity hack.",
    category: "Hustle Culture",
    source:
      "Quandt, T., & Klapproth, J. (2024). The Silicon Valley paradox: A qualitative interview study on the social, cultural, and ideological foundations of a global innovation center. Communications, 50(2), 1–21. https://doi.org/10.1515/commun-2023-0045",
  },

  // Privilege Blindness
  {
    id: 14,
    text: "Tech is one of the fairest industries – code is code, no matter who writes it.",
    category: "Privilege Blindness",
    source:
      "Noble, S. U., & Roberts, S. T. (2019). Technological elites, the meritocracy, and postracial myths in Silicon Valley. In R. Mukherjee, S. Banet-Weiser, & H. Gray (Eds.), Racism postrace (pp. 113–130). Duke University Press. https://doi.org/10.1215/9781478003250",
  },
  {
    id: 15,
    text: "AI bias is a reflection of societal inequality, not just a technical problem to fix.",
    category: "Privilege Blindness",
    reversed: true,
    source:
      "Noble, S. U. (2018). Algorithms of oppression: How search engines reinforce racism. New York University Press.",
  },

  // Techno-Utopianism
  {
    id: 16,
    text: "Once we achieve superintelligent AI, today's problems like discrimination and inequality will be solved automatically.",
    category: "Techno-Utopianism",
    source:
      "Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers of stochastic parrots: Can language models be too big? 🦜. Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency, 610–623. https://doi.org/10.1145/3442188.3445922",
  },
  {
    id: 17,
    text: "Creating Artificial General Intelligence (AGI) is the most important goal for humanity's future, as it will usher in an era of unprecedented abundance.",
    category: "Techno-Utopianism",
    source:
      "Gebru, T., & Torres, É. P. (2024). The TESCREAL bundle: Eugenics and the promise of utopia through artificial general intelligence. First Monday, 29(4). https://doi.org/10.5210/fm.v29i4.13636",
  },
  {
    id: 18,
    text: "Mind uploading, radical life extension, and colonizing Mars are all realistic and highly desirable goals to strive for.",
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
  Meritocracy: { source: "Noble & Roberts, 2019; Malmström et al., 2017" },
  "Techno-Solutionism": {
    source: "Levina & Hasinoff, 2017; Quandt & Klapproth, 2024",
  },
  Disruption: { source: "Daub, 2020" },
  "Cyber-Libertarianism": { source: "Golumbia, 2024" },
  "Hustle Culture": { source: "Quandt & Klapproth, 2024" },
  "Privilege Blindness": {
    source: "Noble & Roberts, 2019; Noble, 2018",
  },
  "Techno-Utopianism": {
    source: "Gebru & Torres, 2024; Bender et al., 2021",
  },
}

export const categoryDescriptions: Record<Category, { text: string; critique: string; source: string }> = {
  Meritocracy: {
    text: "A social system, society, or organization in which people get success or power because of their abilities, not because of their money or social position.",
    critique: "Critics argue this belief ignores systemic barriers like racism and sexism, and legitimizes existing inequalities as 'deserved.'",
    source: "Cambridge Dictionary",
  },
  "Techno-Solutionism": {
    text: "An ideology that recasts complex social phenomena like politics, public health, education, and law enforcement as neatly defined problems with definite, computable solutions.",
    critique: "Critics argue this oversimplifies deeply human problems and ignores the political, cultural, and ethical dimensions that no algorithm can resolve.",
    source: "Evgeny Morozov, To Save Everything, Click Here (2013)",
  },
  Disruption: {
    text: "The action of completely changing the traditional way that an industry or market operates by using new methods or technology.",
    critique: "Critics argue this narrative romanticizes destruction, ignoring the jobs lost, communities displaced, and regulations bypassed in the name of innovation.",
    source: "Cambridge Business English Dictionary",
  },
  "Cyber-Libertarianism": {
    text: "A political ideology that focuses on minimizing government regulation, censorship, or anything else in the way of a 'free' World Wide Web.",
    critique: "Critics argue this 'freedom' primarily benefits powerful tech corporations, while concealing inequality, disinformation, and concentrations of wealth beneath a utopian veneer.",
    source: "Wikipedia, Technolibertarianism",
  },
  "Hustle Culture": {
    text: "The glorification of working very long hours in hope of reaching one's professional goals while having a disregard for their health.",
    critique: "Critics argue this mindset normalizes exploitation and burnout, disproportionately benefiting employers while framing self-destruction as ambition.",
    source: "Urban Dictionary",
  },
  "Privilege Blindness": {
    text: "Privilege is characteristically invisible to people who have it. People in dominant groups often believe that they have earned the privileges that they enjoy or that everyone could have access to these privileges if only they worked to earn them.",
    critique: "This invisibility allows dominant groups to attribute their success solely to merit, while overlooking the systemic advantages that made it possible.",
    source: "Ivey Business Journal",
  },
  "Techno-Utopianism": {
    text: "Any ideology based on the premise that advances in science and technology could and should bring about a utopia, or at least help to fulfill one or another utopian ideal.",
    critique: "Critics argue this dismisses the real harms technology causes today — like algorithmic discrimination — in favor of speculative futures that mostly benefit those already in power.",
    source: "Wikipedia, Technological utopianism",
  },
}

export const genderNote: Record<GenderContext, string> = {
  man: "",
  "not-man":
    "Note: The term 'Tech Bro' describes a structurally gendered phenomenon – built by and for men. Your results reflect how much you've internalized their ideas – not whether the system was built for you. It wasn't.",
}
