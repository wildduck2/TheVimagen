export interface initialStateEmailTypes {
    SelectedEmailData: { ids: string[]; inReplyTo: string }
    searchInput: string
}

export type SelectedEmailDataState = {
    SelectedEmailData: { ids: string[]; inReplyTo: string }
}

export type SelectedEmailDataAction = {
    payload: { ids: string[]; inReplyTo: string }
}

export type SearchInputIdState = {
    searchInput: string
}

export type SearchInputIdAction = {
    payload: string
}
