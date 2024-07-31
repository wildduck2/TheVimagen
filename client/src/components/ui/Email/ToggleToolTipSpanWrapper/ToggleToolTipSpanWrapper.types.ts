export interface ToggleToolTipWrapperSpanProps {
  children?: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  tip?: string
  value?: boolean
  disabled?: boolean
  side?: 'top' | 'left' | 'right' | 'bottom'
}
