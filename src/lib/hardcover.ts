const ENDPOINT = 'https://api.hardcover.app/v1/graphql'

const READING_QUERY = `
  query reading {
    me {
      goals(where: { archived: { _eq: false } }) {
        progress
        description
        goal
        user {
          user_books(
            where: {
              user_book_status: { status: { _eq: "Currently Reading" } }
              _and: { privacy_setting: { setting: { _eq: "Public" } } }
            }
          ) {
            book {
              title
              image { url }
              release_year
              contributions { author { name } }
            }
          }
          reviews: user_books(
            where: {
              has_review: { _eq: true }
              _and: {
                privacy_setting: { setting: { _eq: "Public" } }
                reviewed_at: { _is_null: false }
              }
            }
            order_by: { reviewed_at: desc }
            limit: 1
          ) {
            review_slate
            rating
            book {
              title
              image { url }
              release_year
              contributions { author { name } }
            }
          }
        }
      }
    }
  }
`

interface HardcoverBook {
  title: string | null
  release_year: number | null
  image: { url: string | null } | null
  contributions: { author: { name: string | null } | null }[]
}

interface RawResponse {
  data?: {
    me: {
      goals: {
        progress: number
        description: string
        goal: number
        user: {
          user_books: { book: HardcoverBook }[]
          reviews: {
            review_slate: unknown
            rating: number | null
            book: HardcoverBook
          }[]
        }
      }[]
    }[]
  }
  errors?: { message: string }[]
}

export interface BookSummary {
  title: string
  author: string
  cover: string | null
  year: number | null
}

export interface ReadingChallenge {
  description: string
  progress: number
  goal: number
}

export interface ReadingStatus {
  current: BookSummary | null
  challenge: ReadingChallenge | null
  lastReviewed: (BookSummary & { rating: number | null }) | null
}

function toSummary(book: HardcoverBook): BookSummary {
  return {
    title: book.title ?? 'title unknown',
    author: book.contributions[0]?.author?.name ?? 'author unknown',
    cover: book.image?.url ?? null,
    year: book.release_year ?? null,
  }
}

const EMPTY: ReadingStatus = { current: null, challenge: null, lastReviewed: null }

export async function getReadingStatus(): Promise<ReadingStatus> {
  const key = import.meta.env.HARDCOVER_API_KEY
  if (!key) {
    console.warn('[hardcover] HARDCOVER_API_KEY not set — skipping reading status')
    return EMPTY
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': key.startsWith('Bearer ') ? key : `Bearer ${key}`,
      },
      body: JSON.stringify({ query: READING_QUERY }),
    })

    if (!res.ok) {
      console.warn(`[hardcover] request failed: ${res.status}`)
      return EMPTY
    }

    const json = (await res.json()) as RawResponse
    if (json.errors?.length) {
      console.warn('[hardcover] graphql errors:', json.errors.map(e => e.message).join('; '))
      return EMPTY
    }

    const goal = json.data?.me[0]?.goals[0]
    const user = goal?.user

    return {
      current: user?.user_books[0]?.book ? toSummary(user.user_books[0].book) : null,
      challenge: goal
        ? { description: goal.description, progress: goal.progress, goal: goal.goal }
        : null,
      lastReviewed: user?.reviews[0]
        ? { ...toSummary(user.reviews[0].book), rating: user.reviews[0].rating }
        : null,
    }
  }
  catch (error) {
    console.warn('[hardcover] fetch threw:', error)
    return EMPTY
  }
}
