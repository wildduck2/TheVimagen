import React from 'react'
import { Badge } from '../../../../../ui'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FileMainEreaBodyKanbanColumnTaskHeaderProps } from './FileMainEreaBodyKanbanColumnTask.types'

const FileMainEreaBodyKanbanColumnTaskHeader: React.FC<FileMainEreaBodyKanbanColumnTaskHeaderProps> = ({
  catagory,
  priority,
}) => {
  return (
    <>
      <div className="file-mainerea__body__kanban__colmun__task__list__item__header">
        <div>
          <Badge className={priority}>{priority}</Badge>
          <Badge className={catagory}>{catagory}</Badge>
        </div>
        <BsThreeDotsVertical size={21} />
      </div>
    </>
  )
}

export default FileMainEreaBodyKanbanColumnTaskHeader
