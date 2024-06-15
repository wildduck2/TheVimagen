export type userDataAssigned = {
  id: string
  value: string
  label: string
}
export type AssignUserSheetContentProps = {
  data: userDataAssigned[]
}

export type AssignUsersHandlerProps = {
  data: userDataAssigned[] | []
  assigneduser: userDataAssigned
}
export type Users = {
  id: string
  name: string
  type: string[]
  selected: boolean
}
