import React from 'react'
import { FileMainEreaBodyKanbanColmunHeaderProps } from './FileMainEreaBodyKanban.types'
import { HiDotsVertical } from "react-icons/hi";


const FileMainEreaBodyKanbanColmunHeader: React.FC<FileMainEreaBodyKanbanColmunHeaderProps> = ({ columnName, tasksCount, color }) => {
    return (
        <>
            <div className='file-mainerea__body__kanban__colmun__header'>
                <div className={`${color}`} >
                    <h4>{columnName}</h4>
                    <span>{tasksCount}</span>
                </div>
                <HiDotsVertical size={21} />
            </div >

        </>
    )
}


export default FileMainEreaBodyKanbanColmunHeader
