import { TaskType } from "../FileMainEreaBodyKanban.types"

export interface categoryType {
    id: number
    name: string
    color: string
}

export interface FileMainEreaBodyKanbanColumnTaskHeaderProps {
    catagory: categoryType[]
}

export interface FileMainEreaBodyKanbanColumnTaskProps {
    tasks: TaskType[]
}
