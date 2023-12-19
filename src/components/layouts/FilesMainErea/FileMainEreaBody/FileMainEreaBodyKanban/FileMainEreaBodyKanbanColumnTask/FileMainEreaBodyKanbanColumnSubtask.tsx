import React from 'react'
import { Button, Checkbox, Separator } from '../../../../../ui'
import { FaPlus } from "react-icons/fa6";
const subtasks = [
    {
        id: 1,
        name: 'Subtask 1',
        status: 'In Progress',
    },
    {
        id: 2,
        name: 'Subtask 2',
        status: 'In Progress',
    }
]


const MainEreaBodyKanbanColumnSubtask = () => {
    return (
        <ul className='file-mainerea__body__kanban__colmun__task__list__item__subtasks'>
            <h5>Subtasks</h5>
            {
                subtasks.map((subtask) => (
                    <li key={subtask.id}>
                        <Checkbox id={`${subtask.id}`} />
                        <label
                            htmlFor={`${subtask.id}`}
                        >
                            {subtask.name}
                        </label>
                    </li>
                ))
            }

            <Separator className='separator' />

            <Button variant='ghost'>
                <FaPlus size={19} />
                Add a subtask
            </Button>

        </ul>
    )
}



export default MainEreaBodyKanbanColumnSubtask
