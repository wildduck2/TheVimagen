import React from 'react';
import {
  AddAttachmentSheetWrapper,
  AssignUserSheetContent,
  Button,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '..';
import { FaPlus } from 'react-icons/fa6';
import { AddButtonWrapperProps } from './AddButtonWrapper.types';
import { userDataAssigned } from '../AssignUserSheetContent/AssignUserSheetContent.types';
const frameworks: userDataAssigned[] = [
  {
    id: '1',
    value: 'next.js',
    label: 'Next.js',
  },
  {
    id: '2',
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    id: '3',
    value: 'remix',
    label: 'Remix',
  },
  {
    id: '4',
    value: 'nuxt',
    label: 'Nuxt',
  },
  {
    id: '5',
    value: 'astro',
    label: 'Astro',
  },
  {
    id: '6',
    value: 'gatsby',
    label: 'Gatsby',
  },
  {
    id: '7',
    value: 'docusaurus',
    label: 'Docusaurus',
  },
];

const AddButtonWrapper: React.FC<AddButtonWrapperProps> = ({ title, data, disc, buttonActionText }) => {
  return (
    <div className="dialog-content__form__group__input">
      <Label htmlFor="username">{title}</Label>
      <Sheet>
        <SheetTrigger asChild>
          <Button type="button" variant="ghost" className="gap-2">
            <FaPlus size={19} />
            <span>{title}</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="dialog-content !w-[630px] grid h-full justify-center">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{disc}</SheetDescription>
          </SheetHeader>

          {title === 'Add Attachment' ? (
            <AddAttachmentSheetWrapper />
          ) : title === 'Users Assigned' ? (
            <AssignUserSheetContent data={frameworks} />
          ) : title === 'Add Subtask' ? (
            <span>subtaskwrapper should be here </span>
          ) : null}

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">{buttonActionText}</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddButtonWrapper;
