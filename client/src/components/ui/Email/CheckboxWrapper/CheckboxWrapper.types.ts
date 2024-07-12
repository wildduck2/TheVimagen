import { HtmlHTMLAttributes } from 'react'

export interface CheckboxWrapperType extends HtmlHTMLAttributes<HTMLButtonElement> {
  checked: boolean
  tip: string
}
