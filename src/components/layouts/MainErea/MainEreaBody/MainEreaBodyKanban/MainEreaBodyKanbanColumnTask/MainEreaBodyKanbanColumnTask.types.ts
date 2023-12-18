export interface categoryType {
    id: number
    name: string
    color: string
    status: string
}

export interface MainEreaBodyKenbanCloumnTaskHeaderProps {
    catagory: categoryType[]
}

export interface MainEreaBodyKanbanColumnTaskProps {
    tasks: {
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
    }[]
}

