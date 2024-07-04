 
import { FileMainEreaBodyKanbanColmunHeaderProps } from './FileMainEreaBodyKanban.types'
import { Icon } from '@/assets'

const FileMainEreaBodyKanbanColmunHeader: React.FC<FileMainEreaBodyKanbanColmunHeaderProps> = ({
  columnName,
  tasksCount,
  color,
}) => {
  return (
    <>
      <div className="file-mainerea__body__kanban__colmun__header">
        <div className={`${color}`}>
          <h4>{columnName}</h4>
          <span>{tasksCount}</span>
        </div>
        <Icon.dotVertical className="size-[21px]" />
      </div>
    </>
  )
}

export default FileMainEreaBodyKanbanColmunHeader
