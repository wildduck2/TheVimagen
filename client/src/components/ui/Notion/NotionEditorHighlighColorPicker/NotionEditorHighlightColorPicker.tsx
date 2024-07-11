import { HexColorPicker } from 'react-colorful'
import { Button, Dialog, DialogContent, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui'
import { ColorPickerProps } from './NotionEditorHighlightColorPicker.types'
import { useState } from 'react'
import { DialogTitle } from '@radix-ui/react-dialog'

export const NotionEditorHighlightColorPicker = ({ trigger, onClick }: ColorPickerProps) => {
    const [color, setColor] = useState('#fff')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleChangeComplete = (color: string) => {
        setColor(color)
    }

    return (
        <div className="notion__editor__highlight__color__picker">
            <Dialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            >
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="notion__editor__highlight__color__picker__trigger"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        {trigger}
                    </Button>
                </DialogTrigger>
                <DialogContent className="notion__editor__highlight__color__picker__content">
                    <DialogTitle>Highlight Color</DialogTitle>
                    <DialogDescription>
                        Pick color down to highlight the text with. Click save when you're done.
                    </DialogDescription>
                    <HexColorPicker
                        color={color}
                        onChange={handleChangeComplete}
                    />
                    <div className="notion__editor__highlight__color__picker__content__bottom">
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onClick={() => {
                                    onClick(color)
                                    console.log(color)

                                    setIsDialogOpen(false)
                                }}
                            >
                                Apply
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
