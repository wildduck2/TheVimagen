import { IconType } from '@/assets'
import { headerLinksType } from '@/components/ui'
export type EmailHeaderNavLinksType = Record<'first' | 'second', headerLinksType[]>

export type link = {
  title: string
  icon: ({ className }: IconType) => JSX.Element
  cb?: () => Promise<boolean | undefined>
}
