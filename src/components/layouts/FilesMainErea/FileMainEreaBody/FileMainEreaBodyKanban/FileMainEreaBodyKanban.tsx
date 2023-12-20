import React from 'react'
import FileMainEreaBodyKanbanColmun from './FileMainEreaBodyKanbanColmun'
import { Column } from './FileMainEreaBodyKanban.types'


const columnData: Column[] = [
    {
        id: 1,
        name: 'New Requests',
        color: 'red',
        tasks: [
            {
                id: 1,
                title: 'Improve User Experience',
                discription: 'Making such a big change to the home animations and add slight tweeks to the colors to match the pictures in the background.',
                status: 'In Progress',
                priority: 'Medium',
                catagory: 'UI Design',
                subtasks: [
                    {
                        id: 1,
                        title: 'Adding some cool colors',
                    }
                ],
                usersRelated: [
                    {
                        id: 1,
                        name: 'Ricky Henderson',
                        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxwZXJzb25hbCUyMCUyMHBpY3R1cmUlMjBwcm9maWxlfGVufDB8fDB8fHww',

                    },
                    {
                        id: 2,
                        name: 'Leonardo Fernandez',
                        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxwZXJzb25hbCUyMCUyMHBpY3R1cmUlMjBwcm9maWxlfGVufDB8fDB8fHww',
                    },
                    {
                        id: 3,
                       name: 'Jessica Pearson',
                        image: 'https://images.unsplash.com/photo-1520295187453-cd239786490c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ3fHxwZXJzb25hbCUyMCUyMHBpY3R1cmUlMjBwcm9maWxlfGVufDB8fDB8fHww',
                    },
                    {
                        id: 4,
                       name: 'Dalia Smith',
                        image: 'https://images.unsplash.com/photo-1518825546183-853390a31be3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU2fHxwZXJzb25hbCUyMCUyMHBpY3R1cmUlMjBwcm9maWxlfGVufDB8fDB8fHww',
                    }
                ],
                comments: [
                    {
                        id: 1,
                       comment: 'Oh i have done this before. :)',
                    }
                ],
                attachments: [
                    {
                        id: 1,
                        name: 'Img_for_the_kanban',
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
                title: 'Home Option #2',
                discription: null,
                status: 'In Progress',
                catagory: 'Frontend', 
                priority: 'Medium',
                subtasks: null,
                usersRelated: [
                    {
                        id: 1,
                        name: 'César Rincón',
                        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

                    },
                    {
                        id: 2,
                        name: 'Emaly Rincón',
                        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHBlcnNvbmFsJTIwJTIwcGljdHVyZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
                    },
                ],
                comments: [
                    {
                        id: 1,
                        comment: 'that\'s great',
                    }
                ],
                attachments: [
                    {
                        id: 1,
                        name: 'Img_for_the_kanban',
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
