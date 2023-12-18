import React from 'react'
import { MainEreaBodyKanbanColumnTaskProps, MainEreaBodyKanbanColumnTaskHeader } from '.'


const MainEreaBodyKanbanColumnTask: React.FC<MainEreaBodyKanbanColumnTaskProps> = ({ tasks }) => {

    return (
        <>
            <ul className='main-erea__body__kanban__colmun__task__list'>
                {

                    tasks.map((task) => (
                        <li key={task.id} className='main-erea__body__kanban__colmun__task__list__item'>
                            <MainEreaBodyKanbanColumnTaskHeader catagory={task.catagory} />
                            {task.name}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}


export default MainEreaBodyKanbanColumnTask
