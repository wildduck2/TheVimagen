 
import { Badge } from '../../../../../ui'
import { FileMainEreaBodyKanbanColumnTaskHeaderProps } from './FileMainEreaBodyKanbanColumnTask.types'
import { Icon } from '@/assets'

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
        <Icon.dotVertical className='size-[21px]' />
      </div>
    </>
  )
}

export default FileMainEreaBodyKanbanColumnTaskHeader
