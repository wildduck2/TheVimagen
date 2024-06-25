import { LucideProps } from 'lucide-react'

export type DropdownMenuGroupProps = {
  id: string
  title: string
  icon: React.ForwardRefExoticComponent<LucideProps>
  command: string
  cb?: <T>(...arg: T[]) => void
}

export type DropDownMenuWrapperType = {
  data: {
    title: string
    label?: string | undefined
    icon: React.ForwardRefExoticComponent<LucideProps>
  }
  isCollapsed: boolean
}
