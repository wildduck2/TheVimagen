import { Editor } from '@tiptap/react'
import { ToggleToolTipWrapper } from '../ToggleToolTipWrapper'
import { Icon } from '@/assets'

export const ToolBarToggleButtons = ({ editor }: { editor: Editor }) => {
    return (
        <>
            <div className="bubble__menu__wrapper__icons">
                <ToggleToolTipWrapper
                    tip="Bold"
                    value={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    children={<Icon.bold />}
                />
                <ToggleToolTipWrapper
                    tip="Italic"
                    value={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    children={<Icon.italic />}
                />
                <ToggleToolTipWrapper
                    tip="Underline"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    value={editor.isActive('underline')}
                    children={<Icon.underLine />}
                />
                <ToggleToolTipWrapper
                    tip="Strikethrough"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    value={editor.isActive('strike')}
                    children={<Icon.strikethrough />}
                />
                <ToggleToolTipWrapper
                    tip="Code"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    value={editor.isActive('code')}
                    children={<Icon.code />}
                />
                <ToggleToolTipWrapper
                    tip="Block Code"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    value={editor.isActive('codeBlock')}
                    children={<Icon.codeBlock />}
                />
            </div>
        </>
    )
}
