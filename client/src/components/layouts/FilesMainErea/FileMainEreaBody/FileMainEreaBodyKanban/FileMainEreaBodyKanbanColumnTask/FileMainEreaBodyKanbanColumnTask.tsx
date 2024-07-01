import {FC} from 'react'
import {
  FileMainEreaBodyKanbanColumnSubtask,
  FileMainEreaBodyKanbanColumnTaskHeader,
  FileMainEreaBodyKanbanColumnTaskProps,
  FileMainEreaBodyKanbanColumnTaskFooter,
} from '.'

const FileMainEreaBodyKanbanColumnTask: FC<FileMainEreaBodyKanbanColumnTaskProps> = ({ tasks }) => {
  return (
    <>
      <ul className="file-mainerea__body__kanban__colmun__task__list">
        {tasks.map((task) => (
          <li key={task.id} className="file-mainerea__body__kanban__colmun__task__list__item">
            <FileMainEreaBodyKanbanColumnTaskHeader catagory={task.catagory} priority={task.priority} />
            <div className="file-mainerea__body__kanban__colmun__task__list__item__info">
              <h5>{task.title}</h5>
              <p>{task.discription}</p>
            </div>
            <FileMainEreaBodyKanbanColumnSubtask />
            <FileMainEreaBodyKanbanColumnTaskFooter />
          </li>
        ))}
      </ul>
    </>
  )
}

export default FileMainEreaBodyKanbanColumnTask
