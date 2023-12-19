import { categoryType } from ".";

export type Column = {
    id: number;
    name: string;
    color: string;
    tasks: TaskType[]
}

export type TaskType = {
    id: number;
    name: string;
    discription: string;
    status: string;
    catagory: categoryType[];
    subtasks: {
        id: number;
        name: string;
    }[];
    usersRelated: {
        id: number;
        name: string;
    }[];
    comments: {
        id: number;
        name: string;
    }[];
    attachments: {
        id: number;
        name: string;
    }[];
}

export type FileMainEreaBodyKanbanColmunProps = Omit<Column, 'id'>

export type FileMainEreaBodyKanbanColmunHeaderProps = {
    columnName: string
    tasksCount: number
    color: string
}
