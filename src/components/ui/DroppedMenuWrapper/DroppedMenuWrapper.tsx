import React from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '..';
import { MoreHorizontal } from 'lucide-react';
import { ActionType, DroppedMenuWrapperProps, ShowMoreOptionsProps } from './DroppedMenuWrapper.types';

const DroppedMenuWrapper: React.FC<DroppedMenuWrapperProps> = ({ trigger, content, title }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger> {trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ShowMoreOptions: React.FC<ShowMoreOptionsProps> = ({ name, title, actions }) => {
  const trigger = (
    <Button variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">{name}</span>
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );

  const content = () => (
    <>
      {actions.map((action: ActionType) => (
        <DropdownMenuItem key={action.id} onClick={() => action.action()}>
          {action.label}
        </DropdownMenuItem>
      ))}
    </>
  );
  return <DroppedMenuWrapper trigger={trigger} content={content()} title={title} />;
};

const ShowMoreBadges = () => {};

/* // <DropdownMenuSeparator /> */

export { DroppedMenuWrapper, ShowMoreOptions, ShowMoreBadges };
