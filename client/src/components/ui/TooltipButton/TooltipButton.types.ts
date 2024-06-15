import { LucideIcon } from 'lucide-react'

export type TooltipButtonProps = {
  button: {
    title: string
    label?: string
    icon: LucideIcon
  }
  id?: number
  isCollapsed: boolean
  onClick?: () => void
}
