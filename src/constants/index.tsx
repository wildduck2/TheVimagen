import { RiChat3Line } from 'react-icons/ri';
import { MdOutlineFolder } from 'react-icons/md';
import { WiTime8 } from 'react-icons/wi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { CiGrid31 } from 'react-icons/ci';
import { z } from 'zod';
import React from 'react';
import { ActionType } from '../components/ui/DroppedMenuWrapper/DroppedMenuWrapper.types';
import { Users } from '../components/ui/AssignUserSheetContent/AssignUserSheetContent.types';
import {
  AlertCircle,
  Archive,
  ArchiveX,
  Bell,
  File,
  GalleryVerticalEnd,
  Inbox,
  LucideIcon,
  MessagesSquare,
  Send,
  Settings,
  ShoppingCart,
  Trash2,
  Users2,
} from 'lucide-react';

export const logo = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    version="1.1"
    viewBox="0 0 34 32"
    height="40"
    width="40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.752 19.442c0.042 0.042 0.125 0.105 0.188 0.105h1.109c0.063 0 0.146-0.063 0.188-0.105l0.293-0.314c0.042-0.042 0.063-0.084 0.063-0.125l0.314-1.067c0.021-0.105 0-0.209-0.063-0.272l-0.23-0.188c-0.042-0.042-0.125-0.021-0.188-0.021h-1.004l-0.063-0.063c-0.042 0-0.084-0.021-0.126 0.021l-0.398 0.251c-0.042 0-0.063 0.105-0.084 0.146l-0.335 1.025c-0.042 0.105-0.021 0.23 0.063 0.314l0.272 0.293zM18.919 24.966l-0.084 0.021h-0.251l1.507-4.415c0.042-0.146-0.021-0.314-0.167-0.356l-0.084-0.021h-2.532c-0.105 0.021-0.188 0.105-0.209 0.209l-0.146 0.523c-0.042 0.146 0.063 0.272 0.209 0.314l0.063-0.021h0.377l-1.528 4.373c-0.042 0.146 0.021 0.335 0.167 0.398l0.084 0.063h2.344c0.125 0 0.23-0.105 0.272-0.23l0.146-0.502c0.063-0.147-0.021-0.314-0.167-0.356v0zM30.031 20.844l-0.398-0.523v-0.021c-0.063-0.063-0.125-0.125-0.209-0.125h-1.507c-0.084 0-0.146 0.084-0.209 0.125l-0.419 0.502h-0.649l-0.439-0.502v-0.021c-0.042-0.063-0.126-0.105-0.209-0.105h-0.837l4.227-4.227-4.729-4.687 4.227-4.352v-1.883l-0.586-0.753h-8.558l-0.691 0.732v0.607l-2.365-2.385-1.611 1.569-0.502-0.523h-8.454l-0.67 0.774v1.967l0.628 0.607h0.628v5.461l-2.929 2.929 2.929 2.93v6.696l1.088 0.607h2.427l1.904-1.988 4.52 4.52 3.034-3.034c0.021 0.084 0.084 0.105 0.188 0.146l0.084-0.042h1.967c0.126 0 0.23-0.021 0.251-0.125l0.146-0.418c0.042-0.146-0.021-0.272-0.167-0.314l-0.084 0.021h-0.084l0.712-2.239 0.481-0.481h1.046l-1.046 3.327c-0.042 0.146 0.042 0.23 0.188 0.293l0.084-0.042h1.904c0.105 0 0.209-0.021 0.251-0.125l0.167-0.377c0.063-0.146-0.021-0.272-0.146-0.335-0.021-0.021-0.063 0-0.105 0h-0.084l0.879-2.72h1.276l-1.067 3.327c-0.042 0.146 0.042 0.23 0.188 0.272l0.084-0.063h2.093c0.105 0 0.209-0.021 0.251-0.125l0.167-0.418c0.063-0.146-0.021-0.272-0.167-0.314-0.021-0.021-0.063 0.021-0.105 0.021h-0.146l1.172-3.871c0.042-0.105 0.021-0.23-0.021-0.293v0zM16.68 3.623l2.365 2.365v0.984l0.711 0.858h0.335l-6.068 5.859v-5.859h0.691l0.565-0.879v-1.862l-0.042-0.063 1.444-1.402zM4.167 16.010l2.532-2.532v5.064l-2.532-2.532zM12.307 24.025l12.22-12.555 4.478 4.499-4.227 4.227h-0.021c-0.063 0.021-0.105 0.063-0.146 0.105l-0.439 0.502h-0.607l-0.46-0.502c-0.042-0.063-0.126-0.125-0.209-0.125h-1.841c-0.125 0-0.23 0.084-0.272 0.209l-0.167 0.523c-0.042 0.146 0.021 0.272 0.167 0.335h0.314l-1.339 3.955-3.16 3.181-4.29-4.352z"></path>
  </svg>
);

export const bodyHeaderLinks = [
  {
    id: 1,
    name: 'Discussion',
    path: '/files/discussion',
  },
  {
    id: 2,
    name: 'Tasks',
    path: '/files/tasks',
  },
  {
    id: 3,
    name: 'Timeline',
    path: '/files/timeline',
  },
  {
    id: 4,
    name: 'Files',
    path: '/files/files',
  },
  {
    id: 5,
    name: 'overview',
    path: '/files/overview',
  },
];

export const Emails = [
  'ahmed@example.com',
  'ayob@example.com',
  'abdo@example.com',
  'ali@example.com',
  'mohamed@example.com',
];

export const emailSchema = z.string().email();
export const passwordInRange = z.string().min(8).max(32);
export const passwordhasuppercase = z.string().regex(/(?=.*[A-Z])/);
export const passwordhaslowercase = z.string().regex(/(?=.*[a-z])/);
export const passwordhasnumber = z.string().regex(/(?=.*\d)/);
export const passwordhasspecialcharacter = z.string().regex(/(?=.*[@$!%*?&])/);

export const passwordrules = [
  {
    id: 1,
    name: 'Uppercase letter',
  },
  {
    id: 2,
    name: 'Lowercase letter',
  },
  {
    id: 3,
    name: 'Number',
  },
  {
    id: 4,
    name: 'Special character (e.g. !?<>@#$%)',
  },
  {
    id: 5,
    name: 'Minimum 8 characters',
  },
];

export const actions: ActionType[] = [
  {
    id: '1',
    label: 'copy user info',
    action: (user: Users) => navigator.clipboard.writeText(user.id),
  },
  {
    id: '2',
    label: 'view user profile',
    action: () => {},
  },
];

export type headerLinksType = {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: 'default' | 'ghost';
}[];

export const headerLinks: Record<string, headerLinksType> = {
  first: [
    {
      title: 'Inbox',
      label: '128',
      icon: Inbox,
      variant: 'default',
    },
    {
      title: 'Files',
      label: '9',
      icon: GalleryVerticalEnd,
      variant: 'ghost',
    },
    {
      title: 'Sent',
      label: '',
      icon: Send,
      variant: 'ghost',
    },
    {
      title: 'Junk',
      label: '23',
      icon: ArchiveX,
      variant: 'ghost',
    },
    {
      title: 'Trash',
      label: '',
      icon: Trash2,
      variant: 'ghost',
    },
    {
      title: 'Archive',
      label: '',
      icon: Archive,
      variant: 'ghost',
    },
  ],
  second: [
    {
      title: 'Social',
      label: '972',
      icon: Users2,
      variant: 'ghost',
    },
    {
      title: 'Updates',
      label: '342',
      icon: AlertCircle,
      variant: 'ghost',
    },
    {
      title: 'Forums',
      label: '128',
      icon: MessagesSquare,
      variant: 'ghost',
    },
    {
      title: 'Notifications',
      label: '8',
      icon: Bell,
      variant: 'ghost',
    },
    {
      title: 'Settings',
      label: '21',
      icon: Settings,
      variant: 'ghost',
    },
  ],
};

export const mails = [
  {
    id: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
    name: 'William Smith',
    email: 'williamsmith@example.com',
    subject: 'Meeting Tomorrow',
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: '2023-10-22T09:00:00',
    read: true,
    labels: ['meeting', 'work', 'important'],
  },
  {
    id: '110e8400-e29b-11d4-a716-446655440000',
    name: 'Alice Smith',
    email: 'alicesmith@example.com',
    subject: 'Re: Project Update',
    text: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Alice",
    date: '2023-10-22T10:30:00',
    read: true,
    labels: ['work', 'important'],
  },
];

export type Mail = (typeof mails)[number];

export const accounts = [
  {
    label: 'Alicia Koch',
    email: 'alicia@example.com',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Vercel</title>
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Alicia Koch',
    email: 'alicia@gmail.com',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path
          d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Alicia Koch',
    email: 'alicia@me.com',
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>iCloud</title>
        <path
          d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export type Account = (typeof accounts)[number];

export const contacts = [
  {
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
  },
  {
    name: 'Liam Wilson',
    email: 'liam.wilson@example.com',
  },
  {
    name: 'Olivia Davis',
    email: 'olivia.davis@example.com',
  },
];

export type Contact = (typeof contacts)[number];
