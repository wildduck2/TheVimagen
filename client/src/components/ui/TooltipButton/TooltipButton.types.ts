import { ReactElement } from 'react'

export type TooltipButtonProps = {
  button: {
    title: string
    label?: string
    icon: ReactElement 
  }
  id?: number
  isCollapsed: boolean
  onClick?: () => void
}
