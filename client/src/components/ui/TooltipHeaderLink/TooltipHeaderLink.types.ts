import { IconType } from '@/assets'

export type headerLinksType = {
    title: string
    label?: string
    link: string
    icon: ({ className }: IconType) => JSX.Element
    variant: 'default' | 'ghost'
}

export type TooltipHeaderLinkProps = {
    id?: number
    isCollapsed: boolean
    link?: headerLinksType
    label: number | string
    onClick?: (...arg: unknown[]) => void
}
