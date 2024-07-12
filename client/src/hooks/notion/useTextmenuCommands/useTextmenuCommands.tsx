import { Editor } from '@tiptap/react'
import { useCallback } from 'react'

export const useTextmenuCommands = (editor: Editor) => {
    const chainOnFocus = () => editor.chain().focus()

    const onBold = useCallback(() => chainOnFocus().toggleBold().run(), [editor])
    const onItalic = useCallback(() => chainOnFocus().toggleItalic().run(), [editor])
    const onStrike = useCallback(() => chainOnFocus().toggleStrike().run(), [editor])
    const onUnderline = useCallback(() => chainOnFocus().toggleUnderline().run(), [editor])
    const onCode = useCallback(() => chainOnFocus().toggleCode().run(), [editor])
    const onCodeBlock = useCallback(() => chainOnFocus().toggleCodeBlock().run(), [editor])

    const onSubscript = useCallback(() => chainOnFocus().toggleSubscript().run(), [editor])
    const onSuperscript = useCallback(() => chainOnFocus().toggleSuperscript().run(), [editor])
    const onAlignLeft = useCallback(() => chainOnFocus().setTextAlign('left').run(), [editor])
    const onAlignCenter = useCallback(() => chainOnFocus().setTextAlign('center').run(), [editor])
    const onAlignRight = useCallback(() => chainOnFocus().setTextAlign('right').run(), [editor])
    const onAlignJustify = useCallback(() => chainOnFocus().setTextAlign('justify').run(), [editor])

    const onChangeColor = useCallback((color: string) => chainOnFocus().setColor(color).run(), [editor])
    const onClearColor = useCallback(() => chainOnFocus().unsetColor().run(), [editor])

    const onChangeHighlight = useCallback((color: string) => chainOnFocus().setHighlight({ color }).run(), [editor])
    const onClearHighlight = useCallback(() => chainOnFocus().unsetHighlight().run(), [editor])

    const onLink = useCallback(
        (url: string, inNewTab?: boolean) =>
            chainOnFocus()
                .extendMarkRange('link')
                .setLink({ href: url, target: inNewTab ? '_blank' : '' })
                .run(),
        [editor],
    )
    const unSetLink = useCallback(() => {
        chainOnFocus().unsetLink()
    }, [editor])

    const onSetFont = useCallback(
        (font: string) => {
            if (!font || font.length === 0) {
                return chainOnFocus().unsetFontFamily().run()
            }
            return chainOnFocus().setFontFamily(font).run()
        },
        [editor],
    )

    const onSetFontSize = useCallback(
        (fontSize: string) => {
            if (!fontSize || fontSize.length === 0) {
                return chainOnFocus().unsetFontSize().run()
            }
            return chainOnFocus().setFontSize(fontSize).run()
        },
        [editor],
    )

    const onHeading1 = useCallback(() => chainOnFocus().setHeading({ level: 1 }).run(), [editor])
    const onHeading2 = useCallback(() => chainOnFocus().setHeading({ level: 2 }).run(), [editor])
    const onHeading3 = useCallback(() => chainOnFocus().setHeading({ level: 3 }).run(), [editor])
    const onHeading4 = useCallback(() => chainOnFocus().setHeading({ level: 4 }).run(), [editor])
    const onHeading5 = useCallback(() => chainOnFocus().setHeading({ level: 5 }).run(), [editor])
    const onHeading6 = useCallback(() => chainOnFocus().setHeading({ level: 6 }).run(), [editor])
    const onText = useCallback(() => chainOnFocus().setParagraph().run(), [editor])
    const onTaskList = useCallback(() => chainOnFocus().toggleTaskList().run(), [editor])
    const onBulletList = useCallback(() => chainOnFocus().toggleBulletList().run(), [editor])

    const onNumberList = useCallback(() => chainOnFocus().toggleOrderedList().run(), [editor])
    const onDetailList = useCallback(() => chainOnFocus().toggleBold().run(), [editor])
    //

    return {
        onText,
        onHeading1,
        onHeading2,
        onHeading3,
        onHeading4,
        onHeading5,
        onHeading6,
        onTaskList,
        onBulletList,
        onDetailList,
        onNumberList,
        unSetLink,
        //
        onBold,
        onItalic,
        onStrike,
        onUnderline,
        onCode,
        onCodeBlock,
        onSubscript,
        onSuperscript,
        onAlignLeft,
        onAlignCenter,
        onAlignRight,
        onAlignJustify,
        onChangeColor,
        onClearColor,
        onChangeHighlight,
        onClearHighlight,
        onSetFont,
        onSetFontSize,
        onLink,
    }
}
