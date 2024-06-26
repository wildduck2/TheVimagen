import {
  AlertCircle,
  Archive,
  ArchiveX,
  ChevronRight,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  User,
  Users2,
  LucideIcon,
  Tags,
  CalendarCheck,
  GalleryVerticalEnd,
  Settings,
  ArrowLeftFromLine,
} from 'lucide-react'
import { BiSolidCategoryAlt } from 'react-icons/bi'
import { EmailHeaderNavLinksType, link } from './EmailHeaderNavLinks.types'

export const EmailHeaderNavLinks: EmailHeaderNavLinksType = {
  first: [
    {
      title: 'Inbox',
      link: '/email/inbox',
      label: '128',
      icon: Inbox,
      variant: 'default',
    },
    {
      title: 'Drafts',
      link: '/email/drafts',
      label: '9',
      icon: File,
      variant: 'ghost',
    },
    {
      title: 'Sent',
      link: '/email/sent',
      label: '',
      icon: Send,
      variant: 'ghost',
    },
    {
      title: 'Junk',
      link: '/email/junk',
      label: '23',
      icon: ArchiveX,
      variant: 'ghost',
    },
    {
      title: 'Trash',
      link: '/email/trash',
      label: '',
      icon: Trash2,
      variant: 'ghost',
    },
    {
      title: 'Archive',
      link: '/email/archive',
      label: '',
      icon: Archive,
      variant: 'ghost',
    },
  ],
  second: [
    {
      title: 'Categories',
      link: '/email/categories',
      label: '972',
      icon: Tags,
      variant: 'ghost',
    },
    {
      title: 'Scheduled',
      link: '/email/scheduled',
      label: '342',
      icon: CalendarCheck,
      variant: 'ghost',
    },
    {
      title: 'Updates',
      link: '/email/updates',
      label: '342',
      icon: AlertCircle,
      variant: 'ghost',
    },
    {
      title: 'All Email',
      link: '/email/all-email',
      label: '342',
      icon: GalleryVerticalEnd,
      variant: 'ghost',
    },
    {
      title: 'Settings',
      link: '/email/settings',
      label: '21',
      icon: Settings,
      variant: 'ghost',
    },
  ],
}

export const logoutHeaderLinkData: link = {
  title: 'Get back',
  icon: ArrowLeftFromLine,
}

export const toggleheaderLinkData: link = {
  title: 'Menu',
  icon: ChevronRight,
}

export const profileLinkData: link = {
  title: 'Profile',
  icon: User,
}
