import { LucideProps } from 'lucide-react'
import { ReactElement } from 'react'

export type DropdownMenuGroupProps = {
  id: string
  title: string
    icon: ReactElement
  command: string
  cb?: <T>(...arg: T[]) => void
}

export type DropDownMenuWrapperType = {
  data: {
    title: string
    label?: string | undefined
    icon: ReactElement
  }
  isCollapsed: boolean
}
