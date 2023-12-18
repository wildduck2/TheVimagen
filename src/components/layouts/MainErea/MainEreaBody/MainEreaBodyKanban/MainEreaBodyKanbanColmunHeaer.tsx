import React from 'react'
import { MainEreaBodyKanbanColmunHeaderProps } from './MainEreaBodyKanban.types'
import { HiDotsVertical } from "react-icons/hi";


const MainEreaBodyKanbanColmunHeader: React.FC<MainEreaBodyKanbanColmunHeaderProps> = ({ columnName, tasksCount, color }) => {
    return (
        <>
            <div className='main-erea__body__kanban__colmun__task__header'>
                <div className={`${color}`} >
                    <h4>{columnName}</h4>
                    <span>{tasksCount}</span>
                </div>
                <HiDotsVertical size={21} />
            </div >

        </>
    )
}


export default MainEreaBodyKanbanColmunHeader
