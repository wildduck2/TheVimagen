import { RiChat3Line } from 'react-icons/ri';
import { MdOutlineFolder } from 'react-icons/md';
import { WiTime8 } from 'react-icons/wi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { CiGrid31 } from 'react-icons/ci';
import { z } from 'zod';
import React from 'react';
const size = 30;

export const HeaderLinks = [
  {
    id: 1,

    name: 'Home',
    path: '/',
    icon: <CiGrid31 size={size} strokeWidth={1} />,
  },
  {
    id: 2,
    name: 'Chat',
    path: '/Chat',
    icon: <RiChat3Line size={size} />,
  },
  {
    id: 3,
    name: 'Files',
    path: '/files/tasks',
    icon: <MdOutlineFolder size={size} />,
  },
  {
    id: 4,
    name: 'Timeline',
    path: '/timeline',
    icon: <WiTime8 size={size} />,
  },
  {
    id: 5,
    name: 'Notfications',
    path: '/notfications',
    icon: <IoNotificationsOutline size={size} />,
  },
  {
    id: 6,
    name: 'Groups',
    path: '/groups',
    icon: <AiOutlineUsergroupDelete size={size} />,
  },
  {
    id: 7,
    name: 'Settings',
    path: '/settings',
    icon: <IoSettingsOutline size={size} />,
  },
];

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
