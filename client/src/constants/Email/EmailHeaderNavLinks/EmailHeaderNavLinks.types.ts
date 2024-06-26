import { headerLinksType } from '@/components/ui'
import { LucideIcon } from 'lucide-react'

export type EmailHeaderNavLinksType = Record<'first' | 'second', headerLinksType[]>

export type link = {
  title: string
  icon: LucideIcon
  cb?: () => Promise<boolean | undefined>
}
