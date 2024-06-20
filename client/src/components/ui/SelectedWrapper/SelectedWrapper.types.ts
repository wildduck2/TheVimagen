import { setValueFunc } from '@/utils'

export type OptionWithRevealProps = {
  id: string
  title: string
  className: string
  slectedValuePLaceHolder: string
  data: string[]
  disabled: boolean
  htmlFor: string
  setValue: setValueFunc
  error: boolean | undefined
}
