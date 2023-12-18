import { MainEreaBodyKanbanColumnTaskProps } from ".";

export interface MainEreaBodyKanbanColmunProps {
    column: {
        id: number;
        name: string;
        color: string;
        tasks: MainEreaBodyKanbanColumnTaskProps
    }
}

export interface MainEreaBodyKanbanColmunHeaderProps {
    columnName: string
    tasksCount: number
    color: string
}
