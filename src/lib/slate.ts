interface SlateText {
  text: string
  bold?: boolean
  italic?: boolean
  spoiler?: boolean
}

interface SlateBlockNode {
  type: string
  children: (SlateBlockNode | SlateText)[]
}

interface SlateDocument {
  document?: {
    children?: SlateBlockNode[]
  }
}

function isText(node: SlateBlockNode | SlateText): node is SlateText {
  return 'text' in node
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

let spoilerId = 0

function renderText(node: SlateText): string {
  let content = escapeHtml(node.text)

  if (node.spoiler) {
    const id = `spoiler-${spoilerId++}`
    return `<button type="button" class="spoiler-toggle" aria-expanded="false" aria-controls="${id}">spoiler</button><span id="${id}" class="spoiler-content" hidden>${content}</span>`
  }

  if (node.bold)
    content = `<strong>${content}</strong>`
  if (node.italic)
    content = `<em>${content}</em>`

  return content
}

function renderChildren(children: (SlateBlockNode | SlateText)[]): string {
  return children.map(child => (isText(child) ? renderText(child) : renderBlock(child))).join('')
}

function renderBlock(block: SlateBlockNode): string {
  switch (block.type) {
    case 'paragraph':
      return `<p>${renderChildren(block.children)}</p>`
    case 'block-quote':
      return `<blockquote>${renderChildren(block.children)}</blockquote>`
    case 'bulleted-list':
      return `<ul>${renderChildren(block.children)}</ul>`
    case 'numbered-list':
      return `<ol>${renderChildren(block.children)}</ol>`
    case 'list-item':
      return `<li>${renderChildren(block.children)}</li>`
    default:
      return `<div>${renderChildren(block.children)}</div>`
  }
}

export function renderSlateReview(raw: unknown): string {
  const doc: SlateDocument | null = typeof raw === 'string' ? JSON.parse(raw) : (raw as SlateDocument | null)
  const children = doc?.document?.children
  if (!children?.length)
    return ''

  spoilerId = 0
  return children.map(renderBlock).join('')
}
