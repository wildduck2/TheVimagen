import { HtmlHTMLAttributes } from 'react'

export interface MultiCheckboxWrapperType extends HtmlHTMLAttributes<HTMLButtonElement> {
  action: () => void
  tip: string
  disabled?: boolean
  data: string[]
  dataCompare: string[]
}
