export interface ToggleToolTipWrapperSpanProps {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  tip?: string
  value?: boolean
}
