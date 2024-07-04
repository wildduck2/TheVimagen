export interface ActionType {
    id: string
    label: string
    action?: <T>(arg: T) => void
}

export type ShowMoreOptionsProps = {
    name: string
    title: string
    actions: ActionType[]
}

export type ShowMoreBadgesProps = {
    name: string
    title: string
    actions: string[]
}

export type DroppedMenuWrapperProps = {
    trigger: React.ReactNode
    content: React.ReactNode
    title: string
}
