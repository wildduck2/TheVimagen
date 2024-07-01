import { users } from '../../../FileMainEreaNav'
import { Icon } from '@/assets'

const FileMainEeaBodyKanbanColmunTaskFooter = () => {
  return (
    <div className="file-mainerea__body__kanban__colmun__task__list__item__footer">
      <div>
        {users.map((user) => user.id < 3 && <img key={user.id} src={user.image} alt={user.name + 'profile-img'} />)}

        {users.length > 2 && <button>+{users.length - 2}</button>}
      </div>
      <div>
        <Icon.regCommentAlt className='size-[22px]' />
        <Icon.fiLink className='size-[22px]' />
      </div>
    </div>
  )
}

export default FileMainEeaBodyKanbanColmunTaskFooter
