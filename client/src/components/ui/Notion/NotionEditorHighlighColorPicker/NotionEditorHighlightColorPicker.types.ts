import { ReactElement } from 'react'

export type ColorPickerProps = {
    trigger: ReactElement
    onClick?: (color: string) => boolean
}
