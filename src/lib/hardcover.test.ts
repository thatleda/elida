import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { getReadingStatus } from './hardcover'

const ENDPOINT = 'https://api.hardcover.app/v1/graphql'

function book(title: string, author: string, year: number) {
  return {
    title,
    release_year: year,
    image: { url: `https://example.test/${title}.jpg` },
    contributions: [{ author: { name: author } }],
  }
}

const fullPayload = {
  data: {
    me: [
      {
        goals: [
          {
            progress: 40,
            description: '2026 reading challenge',
            goal: 100,
            user: {
              user_books: [{ book: book('The Dispossessed', 'Ursula K. Le Guin', 1974) }],
              reviews: [
                { review_slate: null, rating: 4.5, book: book('Anxious People', 'Fredrik Backman', 2019) },
              ],
            },
          },
        ],
      },
    ],
  },
}

const server = setupServer()

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
  vi.stubEnv('HARDCOVER_API_KEY', 'Bearer test-token')
})
afterEach(() => server.resetHandlers())
afterAll(() => {
  server.close()
  vi.unstubAllEnvs()
})

describe('getReadingStatus', () => {
  it('maps the current book, challenge, and last review', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json(fullPayload)))

    const status = await getReadingStatus()

    expect(status.current).toEqual({
      title: 'The Dispossessed',
      author: 'Ursula K. Le Guin',
      cover: 'https://example.test/The Dispossessed.jpg',
      year: 1974,
    })
    expect(status.challenge).toEqual({
      description: '2026 reading challenge',
      progress: 40,
      goal: 100,
    })
    expect(status.lastReviewed?.rating).toBe(4.5)
  })

  it('returns an empty status when the response has no goals', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ data: { me: [{ goals: [] }] } })))

    expect(await getReadingStatus()).toEqual({ current: null, challenge: null, lastReviewed: null })
  })

  it('returns an empty status on a GraphQL error', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.json({ errors: [{ message: 'nope' }] })))

    expect(await getReadingStatus()).toEqual({ current: null, challenge: null, lastReviewed: null })
  })

  it('returns an empty status on a transport failure', async () => {
    server.use(http.post(ENDPOINT, () => HttpResponse.error()))

    expect(await getReadingStatus()).toEqual({ current: null, challenge: null, lastReviewed: null })
  })
})
