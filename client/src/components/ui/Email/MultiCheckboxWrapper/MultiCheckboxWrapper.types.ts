import { HtmlHTMLAttributes } from 'react'

export interface MultiCheckboxWrapperType extends HtmlHTMLAttributes<HTMLButtonElement> {
  action: () => void
  disabled?: boolean
  data: string[]
  dataCompare: string[]
}
