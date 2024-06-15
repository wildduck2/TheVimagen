import React from 'react'
import { FileMainEreaBodyKanbanColmunProps } from './FileMainEreaBodyKanban.types'
import {
  FileMainEreaBodyKanbanColmunHeaer,
  FileMainEreaBodyKenbanCloumnAddButton,
  FileMainEreaBodyKanbanColumnTask,
} from './'

const FileMainEreaBodyKanbanColmun: React.FC<FileMainEreaBodyKanbanColmunProps> = ({ color, name, tasks }) => {
  return (
    <>
      <ul className="file-mainerea__body__kanban__colmun">
        <FileMainEreaBodyKanbanColmunHeaer columnName={name} tasksCount={tasks.length} color={color} />

        <FileMainEreaBodyKenbanCloumnAddButton />
        <FileMainEreaBodyKanbanColumnTask tasks={tasks} />
      </ul>
    </>
  )
}

export default FileMainEreaBodyKanbanColmun
