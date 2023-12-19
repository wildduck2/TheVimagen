import React from 'react'
import { Badge } from '../../../../../ui'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FileMainEreaBodyKanbanColumnTaskHeaderProps } from './'
import { MdCategory } from 'react-icons/md';

const FileMainEreaBodyKanbanColumnTaskHeader: React.FC<FileMainEreaBodyKanbanColumnTaskHeaderProps> = ({ catagory }) => {

    return (
        <>
            <div className='file-mainerea__body__kanban__colmun__task__list__item__header'>
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
                <BsThreeDotsVertical size={21}/>
            </div >
        </>
    )
}


export default FileMainEreaBodyKanbanColumnTaskHeader
