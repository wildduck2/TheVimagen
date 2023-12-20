import React from 'react'

import { FaRegCommentAlt } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { users } from '../../../FileMainEreaNav'

const FileMainEeaBodyKanbanColmunTaskFooter = () => {
    return (
        <div className='file-mainerea__body__kanban__colmun__task__list__item__footer'>
            <div>
                {
                    users.map((user) => (
                        user.id < 3 && <img
                            key={user.id}
                            src={user.image}
                            alt={user.name + "profile-img"}
                        />
                    ))
                }

                {
                    users.length > 2 && <button>+{users.length - 2}</button>}
            </div>
            <div>
                <FaRegCommentAlt size={22} />
                <FiLink size={22} />
            </div>

        </div>
    )
}


export default FileMainEeaBodyKanbanColmunTaskFooter
