import { StateType } from '@/components/layouts'

export type PopupDraggableButtonProps = {
    tip: string
    setState: React.Dispatch<React.SetStateAction<StateType>>
    stateSetValue: StateType
}
