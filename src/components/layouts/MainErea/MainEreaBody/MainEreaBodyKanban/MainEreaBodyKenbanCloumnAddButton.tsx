import React from 'react'

import { Button } from '../../../../ui'
import { FaPlus } from "react-icons/fa6";

const MainEreaBodyKenbanCloumnAddButton = () => {
    return (
        <div className='main-erea__body__kanban__colmun__add-button'>
            <Button variant='ghost'>
                <FaPlus size={19}/>
            </Button>
        </div>
    )
}

export default MainEreaBodyKenbanCloumnAddButton
