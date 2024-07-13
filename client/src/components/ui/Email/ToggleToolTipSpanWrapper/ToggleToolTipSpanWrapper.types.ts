export interface ToggleToolTipWrapperSpanProps {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  tip?: string
  value?: boolean
  disabled?: boolean
  side?: 'top' | 'left' | 'right' | 'bottom'
}
