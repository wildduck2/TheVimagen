import { IconType } from "@/assets"

export interface AccordionProps {
  data: string[]
}

export type DefaultICons = {
  [key: string]: ({ className }: IconType) => JSX.Element
}
