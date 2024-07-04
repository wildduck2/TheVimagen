export interface initialStateEmailTypes {
  selectedEmailId: string[]
  searchInput: string
}

export type SelectedEmailIdState = {
  selectedEmailId: string[]
}

export type SelectedEmailIdAction = {
  payload: string[]
}

export type SearchInputIdState = {
  searchInput: string
}

export type SearchInputIdAction = {
  payload: string
}
