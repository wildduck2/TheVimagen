import React from 'react'
import { MainEreaBodyKanbanColmunProps } from './MainEreaBodyKanban.types'
import { MainEreaBodyKanbanColmunHeaer, MainEreaBodyKenbanCloumnAddButton, MainEreaBodyKanbanColumnTask } from './'


const MainEreaBodyKanbanColmun: React.FC<MainEreaBodyKanbanColmunProps> = ({ column }) => {
    return (
        <>
            <ul className='main-erea__body__kanban__colmun'>
                <MainEreaBodyKanbanColmunHeaer columnName={column.name} tasksCount={column.tasks.length} color={column.color} />

                <MainEreaBodyKenbanCloumnAddButton />
                <MainEreaBodyKanbanColumnTask tasks={column.tasks} />
            </ul>
        </>

    )
}


export default MainEreaBodyKanbanColmun
