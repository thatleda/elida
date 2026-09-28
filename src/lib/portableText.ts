import type { PortableTextHtmlComponents } from '@portabletext/to-html'
import type { PortableTextBlock } from '@portabletext/types'
import { toHTML } from '@portabletext/to-html'
import { imageUrl } from './sanity'

const baseComponents: Partial<PortableTextHtmlComponents> = {
  block: {
    blockquote: ({ children }) => `<blockquote>${children}</blockquote>`,
    pre: ({ children }) => `<pre>${children}</pre>`,
    sub: ({ children }) => `<p class="attribution">— ${children}</p>`,
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href ?? ''
      const external = /^https?:\/\//.test(href)
      const rel = external ? ' rel="noopener noreferrer"' : ''
      const target = external ? ' target="_blank"' : ''
      return `<a href="${href}"${rel}${target}>${children}</a>`
    },
  },
}

const componentsWithImages: Partial<PortableTextHtmlComponents> = {
  ...baseComponents,
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return ''
      }
      const src = imageUrl(value.asset._ref).width(1200).fit('max').auto('format').url()
      const alt = (value.alt ?? '').replace(/"/g, '&quot;')
      return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" />`
    },
  },
}

export function renderBlocks(blocks: PortableTextBlock[] | null | undefined, { images = true }: { images?: boolean } = {}): string {
  if (!blocks)
    return ''
  return toHTML(blocks, { components: images ? componentsWithImages : baseComponents })
}
