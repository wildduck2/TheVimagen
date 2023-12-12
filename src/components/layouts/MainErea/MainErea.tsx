import React from 'react';
import { Search } from 'lucide-react';
import { FaRegSquare } from 'react-icons/fa6';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ToggleToolTipWrapper } from '../../ui';
import { FiStar } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { bodyHeaderLinks } from '../../../constants';
import { Separator } from '../../ui/separator';

const MainErea = () => {
  return (
    <section className="main-erea">
      <div className="main-erea__header">
        <div>
          <h1>
            <FaRegSquare />
            <span>Unique</span>
          </h1>
          <div>
            <ToggleToolTipWrapper tip="Search" children={<Search />} />
            <ToggleToolTipWrapper
              onClick={(e) => {
                e.currentTarget.classList.toggle('active');
              }}
              tip="Rate the project"
              children={<FiStar />}
            />
            <ToggleToolTipWrapper tip="More" children={<BsThreeDotsVertical />} />
          </div>
        </div>
        {/* TODO: make data and loop on the data */}
        <div>
          <div>
            <p>
              <FaRegSquare />
              <span>Unique</span>
            </p>
            <span>/</span>
          </div>
          <div>
            <p>
              <FaRegSquare />
              <span>Unique</span>
            </p>
            <span>/</span>
          </div>
          <div>
            <p>
              <FaRegSquare />
              <span>Unique</span>
            </p>
            <span>/</span>
          </div>
        </div>
      </div>

      <div className="main-erea__nav">
        <ul>
          {bodyHeaderLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? 'header__link header__link--active' : 'header__link')}
              >
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-border"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-border"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-border"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <button className="inline-block h-10 w-10 rounded-full ring-2 ring-border bg-border">+48</button>
          </div>

          <Separator orientation="vertical" className="h-[40px]" />
          <button className="inline-block h-10 w-10 rounded-full ring-2 ring-border bg-border">+</button>
        </div>
      </div>
      <div className="main-erea__body"></div>
    </section>
  );
};

export default MainErea;
