import { IconType } from '@/assets'

export type TooltipButtonProps = {
  button: {
    title: string
    label?: string
  icon: ({ className }: IconType) => JSX.Element
  }
  id?: number
  isCollapsed: boolean
  onClick?: () => void
}
