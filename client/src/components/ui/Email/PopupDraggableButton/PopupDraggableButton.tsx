import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    PopupDraggableButtonProps,
    ToggleToolTipButtonWrapper,
} from '@/components/ui'
import { useRef } from 'react'

export const PopupDraggableButton = ({ tip, setState, stateSetValue }: PopupDraggableButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        setState(stateSetValue)
    }

    return (
        <>
            <ToggleToolTipButtonWrapper
                className="popup__draggable__button"
                tip={tip}
                variant="ghost"
                children={
                    <Avatar className="popup__draggable__button__avatar">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN </AvatarFallback>
                    </Avatar>
                }
                ref={buttonRef}
                onClick={handleMouseDown}
            />
        </>
    )
}
