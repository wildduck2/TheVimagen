import { Users } from '@/components/ui'

export const howManyUsersSelected = (data: Users[]) => {
  return data.filter((user: Users) => user.selected).length
}

export const slectUserHandler = (
  id: number,
  users: Users[],
  setNumberOfSelectedUsers: React.Dispatch<React.SetStateAction<number>>,
  setSelectedUsers: React.Dispatch<React.SetStateAction<Users[]>>,
) => {
  users[id].selected = !users[id].selected
  setNumberOfSelectedUsers(howManyUsersSelected(users))
  setSelectedUsers((prev) => {
    if (prev.indexOf(users[id]) === -1) {
      return [...prev, users[id]]
    } else {
      return prev.filter((user: Users) => user.id !== users[id].id)
    }
  })
}

export const toggleSelectAllUsersHandler = (
  data: Users[],
  setNumberOfSelectedUsers: React.Dispatch<React.SetStateAction<number>>,
  setSelectedUsers: React.Dispatch<React.SetStateAction<Users[]>>,
  numberOfSelectedUsers: number,
) => {
  if (numberOfSelectedUsers === data.length) {
    data.forEach((user: Users) => {
      user.selected = false
    })
    setNumberOfSelectedUsers(0)
    setSelectedUsers([])
  } else {
    data.forEach((user: Users) => {
      user.selected = true
    })
    setNumberOfSelectedUsers(data.length)
    setSelectedUsers(data)
  }
}

export const searchUsersHandler = (
  data: Users[],
  e: React.ChangeEvent<HTMLInputElement>,
  setSearchInput: React.Dispatch<React.SetStateAction<string>>,
  setFilteredData: React.Dispatch<React.SetStateAction<Users[]>>,
  searchInput: string,
) => {
  setSearchInput(e.currentTarget.value)
  setFilteredData(
    e.currentTarget.value ? data.filter((user: Users) => user.name.toLowerCase().includes(searchInput) && user) : data,
  )
}
