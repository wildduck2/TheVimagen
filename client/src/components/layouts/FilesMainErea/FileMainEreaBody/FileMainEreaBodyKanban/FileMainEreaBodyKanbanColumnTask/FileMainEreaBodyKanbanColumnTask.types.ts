import { TaskType } from '../FileMainEreaBodyKanban.types'

export interface FileMainEreaBodyKanbanColumnTaskHeaderProps {
  catagory: string
  priority: string
}

export interface FileMainEreaBodyKanbanColumnTaskProps {
  tasks: TaskType[]
}
