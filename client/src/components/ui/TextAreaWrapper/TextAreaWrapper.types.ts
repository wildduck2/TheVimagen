import { setValueFunc } from '@/utils'

export type TextAreaWrapperType = {
  label: string
  value: string
  setValue: setValueFunc
  error: boolean | undefined
}
