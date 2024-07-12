import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    Input,
    ToggleToolTipButtonWrapper,
} from '@/components/ui'
import { Icon } from '@/assets'
import { DialogDescription, DialogTrigger } from '@radix-ui/react-dialog'
import { NotionEditorLinkManagerProps } from './NotionEditorLinkManager.types'
import { cn } from '@/utils'

export const NotionEditorLinkManager: React.FC<NotionEditorLinkManagerProps> = ({
    states,
    commands,
    editor,
}: NotionEditorLinkManagerProps) => {
    const [url, setUrl] = useState('')

    const openDialog = () => {
        const previousUrl = editor.getAttributes('link').href
        setUrl(previousUrl || '')
    }

    return (
        <Dialog>
            <DialogTrigger
                asChild
                className={cn('notion__editor__link__manager__trigger', states.isLink ? 'bg-red-500' : '')}
                onClick={openDialog}
            >
                <ToggleToolTipButtonWrapper
                    tip={'Link'}
                    children={<Icon.fiLink />}
                />
            </DialogTrigger>
            <DialogContent className="notion__editor__link__manager__content">
                <DialogHeader>
                    <DialogTitle>Set Link</DialogTitle>
                </DialogHeader>
                <DialogDescription> Set the link here. Click save when you're done.</DialogDescription>
                <div>
                    <Input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL"
                    />
                </div>
                <div className="notion__editor__link__manager__content__footer">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                url.length > 0 ? commands.onLink(url, true) : editor.commands.unsetLink()
                            }}
                        >
                            Apply
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
