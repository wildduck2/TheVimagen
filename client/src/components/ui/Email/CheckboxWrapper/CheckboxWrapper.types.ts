import { HtmlHTMLAttributes } from 'react'

export interface CheckboxWrapperType extends HtmlHTMLAttributes<HTMLButtonElement> {
  action: ({ checked }: { checked: boolean }) => void
  checked: boolean
  tip: string
  disabled?: boolean
}
