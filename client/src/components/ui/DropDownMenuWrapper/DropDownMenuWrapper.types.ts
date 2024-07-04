import { IconType } from '@/assets'

export type DropdownMenuGroupProps = {
    id: string
    title: string
    icon: JSX.Element
    command: string
    cb?: () => void | undefined
}

export type DropDownMenuWrapperType = {
    data: {
        title: string
        label?: string | undefined
        icon: ({ className }: IconType) => JSX.Element
    }
    isCollapsed: boolean
}
