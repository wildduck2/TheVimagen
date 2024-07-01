import { headerLinksType } from '@/components/ui'
import { ReactElement } from 'react'

export interface NavProps {
  isCollapsed: boolean
  links: headerLinksType[]
}

export type LogoProps = {
  isCollapsed: boolean
}

export type link = {
  title: string
  label?: string | undefined
  icon: ReactElement
  cb?: () => Promise<boolean | undefined>
}
