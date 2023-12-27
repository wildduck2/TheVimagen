import React from 'react';

import {
  AddButtonWrapper,
  Button,
  DatePickerWithRange,
  Input,
  Label,
  SelectWrapper,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Textarea,
} from '../../../../ui';
import { FaPlus } from 'react-icons/fa6';

const statusData = ['To Do', 'In Progress', 'Code Review', 'PM Validation', 'Done'];
const priorityData = ['High', 'Medium', 'Low'];
const categoryData = ['UI Design', 'UX Design', 'Frontend', 'Backend', 'Marketing', 'Product', 'Business'];

const FileMainEreaBodyKenbanCloumnAddButton = () => {
  return (
    <div className="file-mainerea__body__kanban__colmun__add-button">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" type="button">
            <FaPlus size={19} />
          </Button>
        </SheetTrigger>
        <SheetContent className="dialog-content">
          <SheetHeader>
            <SheetTitle>Add Task Under TheVimagen Organization</SheetTitle>
            <SheetDescription>Use the options below to add different types of tasks to your list.</SheetDescription>
          </SheetHeader>
          <form className="dialog-content__form">
            <div className="dialog-content__form__group solid-one">
              <div className="dialog-content__form__group__input">
                <Label htmlFor="title">Title</Label>
                <Input id="title" defaultValue="Give your task a meaningful title..." />
              </div>
            </div>

            <div className="dialog-content__form__group solid-one">
              <div className="dialog-content__form__group__input">
                <Label htmlFor="discription">Discription</Label>
                <Textarea id="discription" placeholder="Type your message here." />
              </div>
            </div>

            <div className="dialog-content__form__group">
              <div className="dialog-content__form__group__input">
                <Label htmlFor="category">Due Date</Label>
                <DatePickerWithRange />
              </div>

              <SelectWrapper data={categoryData} title="Category" slectedValuePLaceHolder="Select a category" />
            </div>

            <div className="dialog-content__form__group">
              <SelectWrapper data={statusData} title="Status" slectedValuePLaceHolder="Select a status" />
              <SelectWrapper data={priorityData} title="Priority" slectedValuePLaceHolder="Select a priority" />
            </div>

            <div className="dialog-content__form__group">
              <div className="dialog-content__form__group__input">
                <Label htmlFor="username">Add Subtask</Label>
                <Button type="button" variant="ghost">
                  <FaPlus size={19} />
                </Button>
              </div>

              <div className="dialog-content__form__group__input">
                <Label htmlFor="username">Add Attachment</Label>
                <Button type="button" variant="ghost">
                  <FaPlus size={19} />
                </Button>
              </div>
            </div>

            <div className="dialog-content__form__group">
              <AddButtonWrapper title="Users Assigned" data={[]} />

              <div className="dialog-content__form__group__input">
                <Label htmlFor="username">Users Assigned</Label>
                <Button type="button" variant="ghost">
                  <FaPlus size={19} />
                </Button>
              </div>
            </div>
          </form>

          <SheetFooter className="dialog-content__footer">
            <SheetClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button type="submit" variant="default">
                Add Task
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FileMainEreaBodyKenbanCloumnAddButton;
