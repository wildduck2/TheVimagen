import { LucideIcon } from 'lucide-react'

export type TooltipLinkProps = {
  link: {
    title: string
    label?: string
    icon: LucideIcon
    variant: 'default' | 'ghost'
  }
  id?: number
  isCollapsed: boolean
}
