import { TooltipHeaderLink } from '../../ui'
import { NavProps } from './Header.types'

export function Nav({ links, labels, isCollapsed }: NavProps) {
  return (
    <nav className="header__nav">
      {links.map((link, index) => (
        <TooltipHeaderLink key={index} link={link} id={index} isCollapsed={isCollapsed} label={labels[index]} />
      ))}
    </nav>
  )
}
