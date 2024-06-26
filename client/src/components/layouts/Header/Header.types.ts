import { headerLinksType } from '@/components/ui'
import { LucideIcon } from 'lucide-react'

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
  icon: LucideIcon
  cb?: () => Promise<boolean | undefined>
}
