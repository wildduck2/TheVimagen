import { Icon } from '@/assets'
import { EmailHeaderNavLinksType, link } from './EmailHeaderNavLinks.types'

export const EmailHeaderNavLinks: EmailHeaderNavLinksType = {
  first: [
    {
      title: 'Inbox',
      link: '/email/inbox',
      label: '128',
      icon: <Icon.inbox/>,
      variant: 'default',
    },
    {
      title: 'Drafts',
      link: '/email/drafts',
      label: '9',
      icon: <Icon.file/>,
      variant: 'ghost',
    },
    {
      title: 'Sent',
      link: '/email/sent',
      label: '',
      icon: <Icon.send/>,
      variant: 'ghost',
    },
    {
      title: 'Junk',
      link: '/email/junk',
      label: '23',
      icon: <Icon.archiveX/>,
      variant: 'ghost',
    },
    {
      title: 'Trash',
      link: '/email/trash',
      label: '',
      icon: <Icon.trash2/>,
      variant: 'ghost',
    },
    {
      title: 'Archive',
      link: '/email/archive',
      label: '',
      icon: <Icon.archive/>,
      variant: 'ghost',
    },
  ],
  second: [
    {
      title: 'Categories',
      link: '/email/categories',
      label: '972',
      icon: <Icon.tags/>,
      variant: 'ghost',
    },
    {
      title: 'Scheduled',
      link: '/email/scheduled',
      label: '342',
      icon: <Icon.calendarCheck/>,
      variant: 'ghost',
    },
    {
      title: 'Updates',
      link: '/email/updates',
      label: '342',
      icon: <Icon.alertCircle/>,
      variant: 'ghost',
    },
    {
      title: 'All Email',
      link: '/email/all-email',
      label: '342',
      icon: <Icon.galleryVerticalEnd/>,
      variant: 'ghost',
    },
    {
      title: 'Settings',
      link: '/email/settings',
      label: '21',
      icon: <Icon.settings/>,
      variant: 'ghost',
    },
  ],
}

export const logoutHeaderLinkData: link = {
  title: 'Get back',
  icon: Icon.arrowLeftFromLine,
}

export const toggleheaderLinkData: link = {
  title: 'Menu',
  icon: Icon.chevronRight,
}

export const profileLinkData: link = {
  title: 'Profile',
  icon: Icon.user,
}
