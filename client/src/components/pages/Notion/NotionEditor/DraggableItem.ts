import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import DraggableItemComponent from './DraggableItemComponent'

export default Node.create({
  name: 'draggableItem',
  group: 'block',
  content: 'block+',
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'div[data-type="draggable-item"]',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'draggable-item' }), 0]
  },
  addNodeView() {
    return ReactNodeViewRenderer(DraggableItemComponent)
  },
})
