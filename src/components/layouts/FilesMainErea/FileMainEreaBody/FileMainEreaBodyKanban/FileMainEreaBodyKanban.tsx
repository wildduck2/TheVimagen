import React from 'react'
import FileMainEreaBodyKanbanColmun from './FileMainEreaBodyKanbanColmun'


const columnData = [
    {
        id: 1,
        name: 'New Requests',
        color: 'red',
        tasks: [
            {
                id: 1,
                name: 'Task 1',
                discription: 'Discription',
                status: 'In Progress',
                catagory: [
                    {
                        id: 1,
                        name: 'Development',
                        color: 'blue',
                    },
                    {
                        id: 2,
                        name: 'Testing',
                        color: 'red',
                    }
                ],
                subtasks: [
                    {
                        id: 1,
                        name: 'Subtask 1',
                    }
                ],
                usersRelated: [
                    {
                        id: 1,
                        name: 'User 1',
                    }
                ],
                comments: [
                    {
                        id: 1,
                        name: 'Comment 1',
                    }
                ],
                attachments: [
                    {
                        id: 1,
                        name: 'Attachment 1',
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'In Progress',
        color: 'white',
        tasks: [
            {
                id: 1,
                name: 'Task 1',
                discription: 'Discription',
                status: 'Done',
                catagory: [
                    {
                        id: 1,
                        name: 'Catagory 1',
                        color: 'blue',
                    }
                ],
                subtasks: [
                    {
                        id: 1,
                        name: 'Subtask 1',
                    }
                ],
                usersRelated: [
                    {
                        id: 1,
                        name: 'User 1',
                    }
                ],
                comments: [
                    {
                        id: 1,
                        name: 'Comment 1',
                    }
                ],
                attachments: [
                    {
                        id: 1,
                        name: 'Attachment 1',
                    }
                ],
            }
        ]
    }
]

const FileMainEreaBodyKanban = () => {
    return <>
        <ul className='file-mainerea__body__kanban'>
            {
                columnData.map((column) => {
                    return (<FileMainEreaBodyKanbanColmun key={column.id} name={column.name} color={column.color} tasks={column.tasks} />
                    )
                })
            }
        </ul>
    </>
}

export default FileMainEreaBodyKanban
