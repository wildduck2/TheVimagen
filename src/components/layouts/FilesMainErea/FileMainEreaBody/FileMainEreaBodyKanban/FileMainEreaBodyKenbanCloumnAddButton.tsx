import React from 'react'

import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Textarea } from '../../../../ui'
import { FaPlus } from "react-icons/fa6";

const FileMainEreaBodyKenbanCloumnAddButton = () => {
    return (
        <div className='file-mainerea__body__kanban__colmun__add-button'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='ghost' type='button'>
                        <FaPlus size={19} />
                    </Button>
                </DialogTrigger>
                <DialogContent className="dialog-content">
                    <DialogHeader>
                        <DialogTitle>Add Task</DialogTitle>
                        <DialogDescription>
                            Use the options below to add different types of tasks to your list.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="dialog-content__form">
                        <div className='dialog-content__form__group'>
                            <div className='dialog-content__form__group__input'>
                                <Label htmlFor="title" >
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    defaultValue="Give your task a meaningful title..."
                                />
                            </div>
                            <div >
                                <Label htmlFor="username" >
                                    Username
                                </Label>
                                <Button type='button' variant='ghost'>
                                    <FaPlus size={19} />
                                </Button>

                            </div>
                        </div>
                        <div className='dialog-content__form__group solid-one'>
                            <div className='dialog-content__form__group__input'>
                                <Label htmlFor="discription" >
                                    Discription
                                </Label>
                                <Textarea id="discription" placeholder="Type your message here." />
                            </div>
                        </div>

                        <div className='dialog-content__form__group'>
                            <div className='dialog-content__form__group__input'>
                                <Label htmlFor="category" >
                                    Category
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                            <SelectItem value="grapes">Grapes</SelectItem>
                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div >
                                <Label htmlFor="username" >
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    defaultValue="@peduarte"
                                />
                            </div>
                        </div>

                    </form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>

                        <DialogClose asChild>
                            <Button type="submit" variant="default">Add Task</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default FileMainEreaBodyKenbanCloumnAddButton
