 
import {
  Badge,
  Checkbox,
  Input,
  ShowMoreBadges,
  ShowMoreOptions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  User,
} from '..'

import { AssignUserSheetContentProps, Users } from './AssignUserSheetContent.types'
import { searchUsersHandler, slectUserHandler, toggleSelectAllUsersHandler } from '@/utils'
import { actions } from '@/constants'
import React from 'react'

export const users: Users[] = [
  {
    id: '1',
    name: 'Jhon Doe',
    type: ['UI Designer'],
    selected: false,
  },
  {
    id: '2',
    name: 'Marly kane',
    type: ['Ux Designer', 'UI Designer', 'Frontend Developer'],
    selected: false,
  },
  {
    id: '3',
    name: 'Marly kane',
    type: ['Ux Designer', 'UI Designer', 'Frontend Developer'],
    selected: false,
  },
]

const AssignUserSheetContent: React.FC<AssignUserSheetContentProps> = () => {
  const [numberOfSelectedUsers, setNumberOfSelectedUsers] = React.useState<number>(0)
  const [selectedUsers, setSelectedUsers] = React.useState<Users[]>([])
  const [searchInput, setSearchInput] = React.useState<string>('')
  const [filteredData, setFilteredData] = React.useState<Users[]>(users)

  console.log(selectedUsers)

  return (
    <>
      <div className="assign-user">
        <div className="assign-user__header">
          <Input
            placeholder="Filter emails..."
            onChange={(e) => searchUsersHandler(users, e, setSearchInput, setFilteredData, searchInput)}
            value={searchInput}
          />
        </div>
        <Table className="assign-user__table">
          <TableHeader>
            <TableRow>
              <TableHead className="assign-user__table__head">
                <Checkbox
                  id="terms"
                  onClick={() =>
                    toggleSelectAllUsersHandler(
                      users,
                      setNumberOfSelectedUsers,
                      setSelectedUsers,
                      numberOfSelectedUsers,
                    )
                  }
                  checked={
                    numberOfSelectedUsers === users.length
                      ? true
                      : numberOfSelectedUsers > 0 && numberOfSelectedUsers < users.length
                        ? 'indeterminate'
                        : false
                  }
                />
              </TableHead>
              <TableHead className="assign-user__table__head">Name</TableHead>
              <TableHead className="assign-user__table__head">Status</TableHead>
              <TableHead className="assign-user__table__head">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="assign-user__table__body">
            {filteredData.length > 0 ? (
              filteredData.map((user, index) => (
                <TableRow
                  key={user.id}
                  className="assign-user__table__body__row"
                  data-slected={users[index].selected ? 'selected' : ''}
                >
                  <TableCell className="assign-user__table__body__row__cell">
                    <Checkbox
                      id={user.id}
                      onClick={() => slectUserHandler(index, users, setNumberOfSelectedUsers, setSelectedUsers)}
                      checked={users[index].selected ? true : false}
                    />
                  </TableCell>
                  <TableCell>
                    <User img="" name={user.name} />
                  </TableCell>
                  <TableCell className="assign-user__table__body__row__cell">
                    <div>
                      {user.type.map((type, index) => index < 2 && <Badge key={index}>{type}</Badge>)}
                      {user.type.length > 2 && <ShowMoreBadges name="Badges" title="Badges" actions={user.type} />}
                    </div>
                  </TableCell>
                  <TableCell className="assign-user__table__body__row__cell">
                    <ShowMoreOptions name="Open Options" title="Options" actions={actions} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="assign-user__table__body__row__cell">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export { AssignUserSheetContent }
