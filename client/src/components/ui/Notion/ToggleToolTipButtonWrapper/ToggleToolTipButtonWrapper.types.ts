import { useTextmenuCommands, useTextmenuStates } from '@/hooks'

export type MouseEvent = React.MouseEventHandler<HTMLButtonElement>

export interface ToggleToolTipWrapperButtonProps {
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  children?: React.ReactNode
  tip?: string
  onClick?: MouseEvent | keyof typeof useTextmenuCommands
  value?: boolean | ReturnType<typeof useTextmenuStates>
  disabled?: boolean
  side?: 'top' | 'left' | 'right' | 'bottom'
}
