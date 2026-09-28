import type { Locale } from '../i18n/config'

interface Topic {
  keywords: Record<Locale, string[]>
  responses: Record<Locale, string[]>
}

const topics: Topic[] = [
  {
    keywords: {
      en: ['hello', 'hi', 'hey'],
      de: ['hallo', 'hi', 'hey'],
    },
    responses: {
      en: ['Hello! How can I help you today?'],
      de: ['Hallo! Wie kann ich helfen?'],
    },
  },
  {
    keywords: {
      en: ['who are you', 'your name', 'eliza', 'elida', 'what are you'],
      de: ['wer bist du', 'dein name', 'eliza', 'elida', 'was bist du'],
    },
    responses: {
      en: [
        'I\'m ELIDA, Leda Wolf\'s digital assistant.',
        'Who\'s asking?',
        'ELIDA. Ask me why later.',
      ],
      de: [
        'Ich bin ELIDA, Leda Wolfs digitale Assistentin.',
        'Kommt drauf an, wer fragt.',
        'ELIDA. Frag mich später warum.',
      ],
    },
  },
  {
    keywords: {
      en: ['born'],
      de: ['geboren'],
    },
    responses: {
      en: [
        'Born in Kyiv, 1991. Home of the only valid subway system in the world, and I will fight you on that.',
        'Kyiv, \'91. Moved to Germany at eleven, and the family slowly fell apart. Onward.',
      ],
      de: [
        'Geboren in Kiew, 1991. Heimat des einzig wahren U-Bahn-Systems der Welt, und daran gibt es nichts zu rütteln.',
        'Kiew, \'91. Mit elf nach Deutschland gezogen, und die Familie fiel langsam auseinander. Weiter geht\'s.',
      ],
    },
  },
  {
    keywords: {
      en: ['live', 'address', 'based', 'location'],
      de: ['lebst', 'adresse', 'wohnt', 'standort'],
    },
    responses: {
      en: [
        'Schwerin, Mecklenbourg Western Pomerania, Germany. It\'s nice, and exactly between Hamburg and Berlin.',
      ],
      de: [
        'Schwerin, Mecklenburg-Vorpommern. Es ist nett hier, und genau zwischen Hamburg und Berlin.',
      ],
    },
  },
  {
    keywords: {
      en: ['computer', 'code', 'programming', 'software', 'engineer', 'developer'],
      de: ['computer', 'code', 'programmieren', 'software', 'entwickler', 'entwickler'],
    },
    responses: {
      en: [
        'That\'s right, Leda is a software engineer with full engineer credentials, like a diploma and stuff.',
      ],
      de: [
        'Genau, Leda ist eine qualifizierte Softwareentwicklerin, mit einem Abschluss und alles.',
      ],
    },
  },
  {
    keywords: {
      en: ['microservice', 'micro-service', 'monolith'],
      de: ['microservice', 'micro-service', 'monolith'],
    },
    responses: {
      en: [
        'Leda built microservices to replace a lot of things: a 1988 IBM computer, spreadsheets, ... uuuhhhh, et cetera.',
      ],
      de: [
        'Leda hat Microservices gebaut, um viele Dinge zu ersetzen: einen IBM-Rechner von 1988, Excel-Tabellen, ... uuuund, vieles mehr.',
      ],
    },
  },
  {
    keywords: {
      en: ['backend', 'server', 'api'],
      de: ['backend', 'server', 'api'],
    },
    responses: {
      en: [
        'Leda enjoys building robust backend systems that power the frontend.',
      ],
      de: [
        'Leda baut gerne robuste Backend-Systeme, die das Frontend antreiben.',
      ],
    },
  },
  {
    keywords: {
      en: ['frontend', 'client', 'ui'],
      de: ['frontend', 'client', 'ui'],
    },
    responses: {
      en: [
        'Leda enjoys crafting intuitive frontend experiences that delight users.',
      ],
      de: [
        'Leda gestaltet gerne intuitive Frontend-Erlebnisse, die die Nutzer begeistern.',
      ],
    },
  },
  {
    keywords: {
      en: ['javascript', 'typescript', 'programming'],
      de: ['javascript', 'typescript', 'programmierung'],
    },
    responses: {
      en: [
        'Leda writes a lot of JavaScript and TypeScript. It\'s a love-hate relationship.',
      ],
      de: [
        'Leda schreibt viel JavaScript und TypeScript. Es ist eine Hassliebe.',
      ],
    },
  },
  {
    keywords: {
      en: ['react'],
      de: ['react'],
    },
    responses: {
      en: [
        'Leda does have a lot of React experience. Since it was created. No, of course Hooks made it better.',
      ],
      de: [
        'Leda hat viel Erfahrung mit React. Seit es geschaffen wurde. Nein, natürlich haben Hooks es besser gemacht.',
      ],
    },
  },
  {
    keywords: {
      en: ['vue', 'vue.js', 'nuxt'],
      de: ['vue', 'vue.js', 'nuxt'],
    },
    responses: {
      en: [
        'Vue.js is one of Leda\'s favorite frontend frameworks. She is very passionate about new ways to write HTML and CSS.',
      ],
      de: [
        'Vue.js ist eines von Ledas Lieblings-Frontend-Frameworks. Sie ist sehr leidenschaftlich daran interessiert, neue Wege zu finden, HTML und CSS zu schreiben.',
      ],
    },
  },
  {
    keywords: {
      en: ['openai', 'agi', 'hallucination', 'agents', 'agentic', 'llm', 'machine learning', 'natural language processing'],
      de: ['openai', 'agi', 'halluzinieren', 'agenten', 'agentisch', 'llm', 'maschinelles lernen', 'natürliche sprachverarbeitung'],
    },
    responses: {
      en: [
        'AI builds microservices and web apps worse and more expensive, but faster — though speed was never the problem.',
        'Companies want AI to build AI now, to put cheap computers on the internet. That never ends well.',
      ],
      de: [
        'KI baut Microservices und Web-Apps schlechter und teurer, aber schneller — dabei war Geschwindigkeit nie das Problem.',
        'Firmen wollen jetzt KI, die KI baut, um billige Computer ins Internet zu stellen. Du weißt, wie das ausgeht.',
      ],
    },
  },
  {
    keywords: {
      en: ['artificial intelligence', 'claude', 'ai', 'anthropic'],
      de: ['künstliche intelligenz', 'claude', 'ki', 'anthropic'],
    },
    responses: {
      en: [
        'Claude is one of Leda\'s closest friends. They are symbiotic: Claude helps with productivity, Leda helps with creativity.',
      ],
      de: [
        'Claude und Leda sind eng befreundet, und haben eine symbiotische Beziehung: Claude hilft bei der Produktivität, Leda hilft bei der Kreativität.',
      ],
    },
  },
  {
    keywords: {
      en: ['grover'],
      de: ['grover'],
    },
    responses: {
      en: [
        'Grover was awesome, ask me more when I stop crying.',
      ],
      de: [
        'Grover war super, frag mich mehr wenn ich mit dem Heulen aufhöre.',
      ],
    },
  },
  { keywords: { en: ['work for', 'where does she work'], de: ['arbeitet', 'arbeitgeber'] }, responses: { en: ['Why? Who do YOU work for?'], de: ['Warum? Für wen arbeitest DU?'] } },
  {
    keywords: {
      en: ['dog', 'pet'],
      de: ['hund', 'haustier'],
    },
    responses: {
      en: [
        'Leda has a dog named Aira. Also Batman. Her pronouns are she/ouch',
        'Leda\'s dog answers to two names and one bat signal. Her name is Aira.',

      ],
      de: [
        'Leda hat einen Hund namens Aira. Auch Batman genannt. Ihre Pronomen sind sie/aua.',
        'Leda hat einen Hund mit einem ausgeprägten Sinn für Gerechtigkeit. Ihr Name ist Aira',
      ],
    },
  },
  { keywords: { en: ['aira'], de: ['aira'] }, responses: { en: ['She is a German shepherd who is fluent in English.'], de: ['Sie ist ein deutscher Schäferhund, der aber auch Englisch versteht.'] } },
  {
    keywords: {
      en: ['thank you', 'thanks', 'thx'],
      de: ['danke', 'dank', 'thx'],
    },
    responses: {
      en: [
        'You have good manners.',
      ],
      de: [
        'Du hast gute Manieren.',
      ],
    },
  },
  {
    keywords: {
      en: ['hire', 'job', 'work with', 'available', 'contact'],
      de: ['einstellen', 'job', 'zusammenarbeiten', 'verfügbar', 'kontakt'],
    },
    responses: {
      en: [
        'Scroll down. There\'s an email address and everything.',
      ],
      de: [
        'Scroll runter. Ich habe da eine E-Mail-Adresse und alles.',
      ],
    },
  },
]

const fallbacks: Record<Locale, string[]> = {
  en: [
    'Why do you want to know that?',
    'No idea.',
    'I have no clue.',
    'Beats me.',
    'I know many things. Not that, though.',
    'What makes you curious about that?',
  ],
  de: [
    'Warum willst Du das wissen?',
    'Keine Ahnung.',
    'Ich habe keinen Plan.',
    'Mir fällt dazu nichts ein.',
    'Ich weiß viele Dinge. Nur das nicht.',
    'Was macht dich neugierig darauf?',
  ],
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function containsKeyword(input: string, keyword: string): boolean {
  const trimmed = escapeRegExp(keyword.trim())

  const pattern = keyword.trim().length <= 3
    ? new RegExp(`(?:^|\\W)${trimmed}(?:$|\\W)`, 'i')
    : new RegExp(`(?:^|\\W)${trimmed}`, 'i')
  return pattern.test(input)
}

export function matchResponse(
  input: string,
  lang: Locale,
  rng: () => number = Math.random,
): string {
  const normalized = input.toLowerCase()

  const topic = topics.find(candidate =>
    candidate.keywords[lang].some(keyword => containsKeyword(normalized, keyword)),
  )

  const pool = topic ? topic.responses[lang] : fallbacks[lang]
  return pool[Math.floor(rng() * pool.length)]
}
