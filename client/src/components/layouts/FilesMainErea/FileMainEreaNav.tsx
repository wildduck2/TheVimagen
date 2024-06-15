import React from 'react'

import { NavLink } from 'react-router-dom'
import { bodyHeaderLinks } from '../../../constants'
import { Separator } from '../../ui'
import { FaPlus } from 'react-icons/fa6'

export const users = [
  {
    id: 1,
    name: 'Unique',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  },
  {
    id: 2,
    name: 'Unique',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  },
  {
    id: 3,
    name: 'Unique',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  },
  {
    id: 4,
    name: 'Unique',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
  },
]

const FileMainEreaNav = () => {
  return (
    <div className="file-mainerea__nav">
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

      <div className="users-related">
        <div>
          {users.map((user) => user.id < 4 && <img key={user.id} src={user.image} alt={user.name + 'profile-img'} />)}

          {users.length > 3 && <button>+32</button>}
        </div>

        <Separator orientation="vertical" className="sperator" />
        <button>
          <FaPlus size={17} />
        </button>
      </div>
    </div>
  )
}

export default FileMainEreaNav
