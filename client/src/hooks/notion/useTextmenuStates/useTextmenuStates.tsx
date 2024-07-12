import { Editor } from '@tiptap/react'
import { useCallback, useMemo } from 'react'
import { ShouldShowProps } from '@/components/pages'
import { isCustomNodeSelected, isTextSelected } from '@/utils'

export const useTextmenuStates = (editor: Editor) => {
    const shouldShow = useCallback(
        ({ view, from }: ShouldShowProps) => {
            if (!view) {
                return false
            }

            const domAtPos = view.domAtPos(from || 0).node as HTMLElement
            const nodeDOM = view.nodeDOM(from || 0) as HTMLElement
            const node = nodeDOM || domAtPos

            if (isCustomNodeSelected(editor, node)) {
                return false
            }

            return isTextSelected({ editor })
        },
        [editor],
    )

    return {
        isText: editor.isActive('text'),
        isHeading1: editor.isActive('heading', { level: 1 }),
        isHeading2: editor.isActive('heading', { level: 2 }),
        isHeading3: editor.isActive('heading', { level: 3 }),
        isHeading4: editor.isActive('heading', { level: 4 }),
        isHeading5: editor.isActive('heading', { level: 5 }),
        isHeading6: editor.isActive('heading', { level: 6 }),
        isTaskList: editor.isActive('taskList'),
        isBulletList: editor.isActive('bulletList'),
        isDetailList: editor.isActive('detailList'),
        isNumberedList: editor.isActive('orderedList'),
        isLink: editor.isActive('link'),
        //
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
        isStrike: editor.isActive('strike'),
        isUnderline: editor.isActive('underline'),
        isCodeBlock: editor.isActive('codeBlock'),
        isCode: editor.isActive('code'),
        isSubscript: editor.isActive('subscript'),
        isSuperscript: editor.isActive('superscript'),
        isAlignLeft: editor.isActive({ textAlign: 'left' }),
        isAlignCenter: editor.isActive({ textAlign: 'center' }),
        isAlignRight: editor.isActive({ textAlign: 'right' }),
        isAlignJustify: editor.isActive({ textAlign: 'justify' }),
        currentColor: editor.getAttributes('textStyle')?.color || undefined,
        currentHighlight: editor.getAttributes('highlight')?.color || undefined,
        currentFont: editor.getAttributes('textStyle')?.fontFamily || undefined,
        currentSize: editor.getAttributes('textStyle')?.fontSize || undefined,
        shouldShow,
    }
}
