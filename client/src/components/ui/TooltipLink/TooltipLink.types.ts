import { IconType } from '@/assets'

export type headerLinksType = {
  title: string
  label?: string
  link: string
  icon: ({ className }: IconType) => JSX.Element
  variant: 'default' | 'ghost'
}

export type TooltipLinkProps = {
  link: headerLinksType
  id?: number
  isCollapsed: boolean
}
