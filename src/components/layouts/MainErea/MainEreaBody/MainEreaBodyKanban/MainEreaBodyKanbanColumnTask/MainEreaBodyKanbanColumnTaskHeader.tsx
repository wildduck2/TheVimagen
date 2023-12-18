import React from 'react'
import { MainEreaBodyKenbanCloumnTaskHeaderProps } from './MainEreaBodyKanbanColumnTask.types'
import { Badge } from '../../../../../ui'
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdCategory } from 'react-icons/md';

const MainEreaBodyKanbanColumnTaskHeader: React.FC<MainEreaBodyKenbanCloumnTaskHeaderProps> = ({ catagory }) => {

    return (
        <>
            <div className='main-erea__body__kanban__colmun__header'>
                <div>
                    {
                        catagory.map((catagory) => {
                            return (MdCategory.length < 4 && <Badge key={catagory.id} className={`${catagory.color}`}>
                                {catagory.name}
                            </Badge>
                            )
                        })
                    }
                </div>
                <BsThreeDotsVertical />
            </div >
        </>
    )
}


export default MainEreaBodyKanbanColumnTaskHeader
