import { describe, expect, it } from 'vitest'
import { renderSlateReview } from './slate'

function doc(children: unknown[]) {
  return { document: { object: 'document', children } }
}

describe('renderSlateReview', () => {
  it('renders paragraphs', () => {
    const html = renderSlateReview(doc([
      { type: 'paragraph', children: [{ text: 'A good book.' }] },
    ]))
    expect(html).toBe('<p>A good book.</p>')
  })

  it('renders bold and italic marks', () => {
    const html = renderSlateReview(doc([
      {
        type: 'paragraph',
        children: [
          { text: 'bold', bold: true },
          { text: ' and ' },
          { text: 'italic', italic: true },
        ],
      },
    ]))
    expect(html).toBe('<p><strong>bold</strong> and <em>italic</em></p>')
  })

  it('renders block-quotes, lists and list items', () => {
    const html = renderSlateReview(doc([
      { type: 'block-quote', children: [{ text: 'wise words' }] },
      {
        type: 'bulleted-list',
        children: [
          { type: 'list-item', children: [{ text: 'one' }] },
          { type: 'list-item', children: [{ text: 'two' }] },
        ],
      },
    ]))
    expect(html).toBe('<blockquote>wise words</blockquote><ul><li>one</li><li>two</li></ul>')
  })

  it('renders a spoiler as a toggle button plus hidden content', () => {
    const html = renderSlateReview(doc([
      { type: 'paragraph', children: [{ text: 'the butler did it', spoiler: true }] },
    ]))
    expect(html).toContain('class="spoiler-toggle"')
    expect(html).toContain('hidden>the butler did it</span>')
  })

  it('escapes HTML in the source text', () => {
    const html = renderSlateReview(doc([
      { type: 'paragraph', children: [{ text: '<script>alert(1)</script>' }] },
    ]))
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('parses a JSON string document the same as an object', () => {
    const asString = JSON.stringify(doc([{ type: 'paragraph', children: [{ text: 'hi' }] }]))
    expect(renderSlateReview(asString)).toBe('<p>hi</p>')
  })

  it('returns an empty string for a missing or empty document', () => {
    expect(renderSlateReview(null)).toBe('')
    expect(renderSlateReview(doc([]))).toBe('')
  })
})
