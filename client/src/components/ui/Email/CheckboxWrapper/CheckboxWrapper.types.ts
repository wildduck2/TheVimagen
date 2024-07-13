import { HtmlHTMLAttributes } from 'react'

export interface CheckboxWrapperType extends HtmlHTMLAttributes<HTMLButtonElement> {
  action: (...args: unknown[]) => void
  checked: boolean
  tip: string
  disabled?: boolean
  perSelected?: boolean
}
