import { headerLinksType } from '@/components/ui'
import { ReactElement } from 'react'
export type EmailHeaderNavLinksType = Record<'first' | 'second', headerLinksType[]>

export type link = {
  title: string
  icon: ReactElement 
  cb?: () => Promise<boolean | undefined>
}
