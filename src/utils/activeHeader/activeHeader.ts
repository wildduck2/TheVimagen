import { MouseEvent, RefObject } from 'react';

const activeHeader = (e: MouseEvent<HTMLButtonElement>, headerRef: RefObject<HTMLHeadElement>) => {
  const header = headerRef.current;
  if (header) {
    header.classList.toggle('header--active');
    e.currentTarget.classList.toggle('header__btn--active');
  }
};

export { activeHeader };
