import React from 'react'
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from '..'
import { FilterWrapperProps } from './FilterWrapper.types'
import { RxMixerHorizontal } from "react-icons/rx";



const FilterWrapper = ({ className }: FilterWrapperProps) => {
    return <>


        <Button variant="ghost" className='text-lg gap-2 flex'>
            <RxMixerHorizontal size={25} />
            <span className='font-semibold'>Filter</span>
        </Button>
    </>
}


export default FilterWrapper
