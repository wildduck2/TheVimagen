import { LucideIcon } from 'lucide-react';

export interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: 'default' | 'ghost';
  }[];
}

export type LogoProps = {
  isCollapsed: boolean;
};

export type link = {
  title: string;
  label?: string | undefined;
  icon: LucideIcon;
};
