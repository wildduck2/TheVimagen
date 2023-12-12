import { Link, NavLink } from 'react-router-dom';
import { HeaderLinks } from '../../../constants';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { activeHeader } from '../../../utils';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui';

const Header = () => {
  const headerRef = React.createRef<HTMLHeadElement>();
  return (
    <>
      <header ref={headerRef} className="header">
        <nav>
          <Link to="/" className="header__logo">
            <Avatar className="profile">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <span className="name">Thevimagen</span>
          </Link>

          <ul className="header__list">
            {HeaderLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? 'header__link header__link--active' : 'header__link')}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button className="header__btn" onClick={(e) => activeHeader(e, headerRef)}>
          <MdOutlineKeyboardArrowRight size={30} fill="hsl(240, 1%, 35%)" />
        </button>
      </header>
    </>
  );
};

export default Header;
