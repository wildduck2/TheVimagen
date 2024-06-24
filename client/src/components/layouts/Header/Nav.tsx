import { TooltipLink } from '../../ui'
import { NavProps } from './Header.types'

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <nav className="header__nav">
      {links.map((link, index) => (
        <TooltipLink key={index} link={link} id={index} isCollapsed={isCollapsed} />
      ))}
    </nav>
  )
}
