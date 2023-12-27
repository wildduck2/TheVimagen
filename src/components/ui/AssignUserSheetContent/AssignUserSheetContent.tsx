import React from 'react';

import {
  Badge,
  Checkbox,
  DroppedMenuWrapper,
  Input,
  ShowMoreOptions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  User,
} from '..';

import { AssignUserSheetContentProps, userDataAssigned } from './AssignUserSheetContent.types';
import { ActionType } from '../DroppedMenuWrapper/DroppedMenuWrapper.types';
import { MoreHorizontal } from 'lucide-react';

export type AssignUsersHandlerProps = {
  data: userDataAssigned[] | [];
  assigneduser: userDataAssigned;
};

const users = [
  {
    id: '1',
    name: 'Jhon Doe',
    type: ['UI Designer'],
  },
  {
    id: '2',
    name: 'Marly kane',
    type: ['Ux Designer', 'UI Designer'],
  },
];

const actions: ActionType[] = [
  {
    id: '1',
    label: 'copy user info',
    action: () => {},
  },
  {
    id: '2',
    label: 'view user profile',
    action: () => {},
  },
];
const AssignUserSheetContent: React.FC<AssignUserSheetContentProps> = () => {
  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input placeholder="Filter emails..." className="max-w-sm border" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Checkbox id="terms" />
                Select
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex">
                  <Checkbox id={user.id} className="w-4 h-4 border border-slate-300" />
                </TableCell>
                <TableCell>
                  <User img="" name={user.name} />
                </TableCell>
                <TableCell className="flex  h-[61px] place-items-center">
                  <div className="flex gap-2">
                    {user.type.map((type, index) => (
                      <Badge key={index}>{type}</Badge>
                    ))}
                    {user.type.length > 1 && <ShowMoreOptions name="Open Options" title="Options" actions={actions} />}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <ShowMoreOptions name="Open Options" title="Options" actions={actions} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AssignUserSheetContent;
