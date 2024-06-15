import React from 'react'
import { Checkbox, Separator } from '../../../../../ui'
const subtasks = [
  {
    id: 1,
    name: 'Reminder',
  },
  {
    id: 2,
    name: 'Making Payment',
  },
]

const MainEreaBodyKanbanColumnSubtask = () => {
  return (
    <ul className="file-mainerea__body__kanban__colmun__task__list__item__subtasks">
      <h5>Subtasks</h5>
      {subtasks.length &&
        subtasks.map((subtask) => (
          <li key={subtask.id}>
            <Checkbox id={`${subtask.id}`} />
            <label htmlFor={`${subtask.id}`}>{subtask.name}</label>
          </li>
        ))}

      <Separator className="separator" />
    </ul>
  )
}

export default MainEreaBodyKanbanColumnSubtask
