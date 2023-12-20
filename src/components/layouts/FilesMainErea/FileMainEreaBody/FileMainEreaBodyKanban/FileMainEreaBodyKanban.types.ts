export type SubtaskType = {
    id: number
    title: string
    // status: string
}

export type UserType = {
    id: number
    name: string
    image: string
    /* email: string
    role: string
    status: string
    tasks: TaskType[] | null */
}

export type CommentType = {
    id: number;
    comment: string;
    // userWhoPosted: UserType;
}

export type AttachmentType = {
    id: number;
    name: string;
    // url: string;
}

export type TaskType = {
    id: number;
    title: string;
    discription: string | null;
    status: string;
    catagory: string;
    priority: string;
    subtasks: SubtaskType[] | null;
    usersRelated: UserType[] | null;
    comments: CommentType[] | null;
    attachments: AttachmentType[] | null;
}

export type Column = {
    id: number;
    name: string;
    color: string;
    tasks: TaskType[]
}

export type FileMainEreaBodyKanbanColmunProps = Omit<Column, 'id'>

export type FileMainEreaBodyKanbanColmunHeaderProps = {
    columnName: string
    tasksCount: number
    color: string
}
