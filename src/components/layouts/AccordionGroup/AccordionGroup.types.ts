import type { TbTriangle } from 'react-icons/tb';

export interface AccordionProps {
  data: string[];
}

export type DefaultICons = {
  [key: string]: typeof TbTriangle;
};
