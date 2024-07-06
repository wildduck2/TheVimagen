import { Icon, IconType } from '@/assets'
import { EmailHeaderNavLinksType, link } from './EmailHeaderNavLinks.types'

export const EmailHeaderNavLinks: EmailHeaderNavLinksType = {
  first: [
    {
      title: 'Inbox',
      link: '/email/inbox',
      icon: ({ className }: IconType) => <Icon.inbox className={className} />,
      variant: 'default',
    },
    {
      title: 'Drafts',
      link: '/email/drafts',
      label: '9',
      icon: ({ className }: IconType) => <Icon.file className={className} />,
      variant: 'ghost',
    },
    {
      title: 'Sent',
      link: '/email/sent',
      label: '',
      icon: ({ className }: IconType) => <Icon.send className={className} />,
      variant: 'ghost',
    },
    {
      title: 'Junk',
      link: '/email/junk',
      label: '23',
      icon: ({ className }: IconType) => <Icon.archiveX className={className} />,
      variant: 'ghost',
    },
    {
      title: 'Trash',
      link: '/email/trash',
      label: '',
      icon: ({ className }: IconType) => <Icon.trash2 className={className} />,
      variant: 'ghost',
    },
    {
      title: 'Archive',
      link: '/email/archive',
      label: '',
      icon: ({ className }: IconType) => <Icon.archive className={className} />,
      variant: 'ghost',
    },
  ],
  second: [
    {
      title: 'Categories',
      link: '/email/categories',
      label: '972',
      icon: ({ className }: IconType) => <Icon.tags className={className} />,
      variant: 'ghost',
    },
    {
      title: 'Scheduled',
      link: '/email/scheduled',
      label: '342',
      icon: ({ className }: IconType) => <Icon.calendarCheck className={className} />,
      variant: 'ghost',
    },
    {
      title: 'Updates',
      link: '/email/updates',
      label: '342',
      icon: ({ className }: IconType) => <Icon.alertCircle className={className} />,
      variant: 'ghost',
    },
    {
      title: 'All Email',
      link: '/email/all-email',
      label: '342',
      icon: ({ className }: IconType) => <Icon.galleryVerticalEnd className={className} />,
      variant: 'ghost',
    },
    {
      title: 'Settings',
      link: '/email/settings',
      label: '21',
      icon: ({ className }: IconType) => <Icon.settings className={className} />,
      variant: 'ghost',
    },
  ],
}

export const logoutHeaderLinkData: link = {
  title: 'Get back',
  icon: ({ className }: IconType) => <Icon.arrowLeftFromLine className={className} />,
}

export const toggleheaderLinkData: link = {
  title: 'Menu',
  icon: ({ className }: IconType) => <Icon.chevronRight className={className} />,
}

export const profileLinkData: link = {
  title: 'Profile',
  icon: ({ className }: IconType) => <Icon.user className={className} />,
}
