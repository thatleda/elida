import type { Locale } from './config'

export const ui = {
  en: {
    'hero.tagline': 'I\'m a software engineer',
    'hero.pitch': 'Let\'s see if I\'m a <u>good fit</u> for your company.',

    'nav.menu': 'Main navigation',
    'nav.language': 'Language',
    'nav.toggle.color-mode': 'Toggle color mode',
    'nav.who': 'Who?',
    'nav.previously': 'Previously',
    'nav.blog': 'Ramblings',
    'nav.working-with': 'Working with Leda',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',
    'nav.menu.open': 'Open menu',

    'section.who': 'Who?',
    'section.previously': 'Previously, on Leda’s adventures',
    'section.reviews': 'Working with Leda',
    'section.contact': 'What is she up to?',

    'reading.title': 'Currently reading',
    'reading.finished': 'Just finished reading',
    'reading.by': 'by',
    'reading.rating': 'Rating',
    'reading.stars': 'stars',
    'reading.none': 'Not reading anything at the moment',

    'contact.leda':
      'If you have developed a strong desire to communicate or collaborate, please don\'t hesitate and write to:',

    'ramblings.title': 'Unhinged ramblings',
    'ramblings.description':
      'You have reached the coveted index of Leda Wolf\'s select wisdom nuggets. Good for you!',
    'ramblings.next': 'Next',
    'ramblings.previous': 'Previous',
    'ramblings.page': 'Page',
    'ramblings.of': 'of',
    'ramblings.empty': 'No entries yet.',
    'article.published': 'published',
    'article.back': 'Back to the index',

    'footer.powered': 'ELIZA-adjacent vanity',
    'footer.privacy': 'Privacy',
    'footer.imprint': 'Imprint',

    'terminal.prompt': 'Type a command, or press ? for help',
    'skip.content': 'Skip to content',
  },
  de: {
    'hero.tagline': 'Ich bin eine Software-Entwicklerin',
    'hero.pitch': 'Finden wir heraus, ob ich <u>gut zu Euch passe</u>.',

    'nav.menu': 'Hauptmenü',
    'nav.language': 'Sprache',
    'nav.toggle.color-mode': 'Farbmodus umschalten',
    'nav.who': 'Wer?',
    'nav.previously': 'Bisher',
    'nav.blog': 'Gedankenwirrwarr',
    'nav.working-with': 'Mit Leda arbeiten',
    'nav.contact': 'Kontakt',
    'nav.resume': 'Lebenslauf',
    'nav.menu.open': 'Menü öffnen',

    'section.who': 'Wer?',
    'section.previously': 'Bisher, in Ledas Abenteuern',
    'section.reviews': 'Mit Leda arbeiten',
    'section.contact': 'Was macht sie gerade?',

    'reading.title': 'Aktuell lese ich',
    'reading.finished': 'Gerade gelesen',
    'reading.by': 'von',
    'reading.rating': 'Bewertung',
    'reading.stars': 'Sterne',
    'reading.none': 'Momentan lese ich nichts',

    'contact.leda':
      'Wenn du das starke Bedürfnis verspürst, mit mir zu kommunizieren oder gar zusammenzuarbeiten, zögere bitte nicht und schreibe an:',

    'ramblings.title': 'Gedankenwirrwarr auf Englisch',
    'ramblings.description':
      'Du hast den versteckten Index von Leda Wolfs ausgewählten Weisheitsnuggets erreicht. Gut für dich!',
    'ramblings.next': 'Nächste Seite',
    'ramblings.previous': 'Vorherige Seite',
    'ramblings.page': 'Seite',
    'ramblings.of': 'von',
    'ramblings.empty': 'Noch keine Einträge.',
    'article.published': 'veröffentlicht',
    'article.back': 'Zurück zum Index',

    'footer.powered': 'ELIZA-nahe Eitelkeit',
    'footer.privacy': 'Datenschutz',
    'footer.imprint': 'Impressum',

    'terminal.prompt': 'Gib einen Befehl ein, oder drücke ? für Hilfe',
    'skip.content': 'Zum Inhalt springen',
  },
} as const satisfies Record<Locale, Record<string, string>>

export type UIKey = keyof (typeof ui)['en']
