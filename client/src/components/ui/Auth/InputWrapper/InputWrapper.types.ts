import { setValueFunc } from '@/utils'

export type InputWrapperType = {
  value: string
  label: string
  setValue: setValueFunc
  error: boolean | undefined
}
