import { setValueFunc } from '@/utils'

export type CommandWrapperType = {
  title: string
  value: string
  setValue: setValueFunc
  disabled: boolean
  className: string
  data: string[]
  error: boolean | undefined
}
