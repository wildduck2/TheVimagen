import { LucideIcon } from 'lucide-react'

export type headerLinksType = {
  title: string
  label?: string
  link: string
  icon: LucideIcon
  variant: 'default' | 'ghost'
}

export type TooltipLinkProps = {
  link: headerLinksType
  id?: number
  isCollapsed: boolean
}
