export type HandleAddEmailSubmitProps = {
  e: React.FormEvent<HTMLFormElement>
  email: string
  emails: string[]
  setEmails: React.Dispatch<React.SetStateAction<string[]>>
}

export type HandleRemoveEmailProps = {
  emails: string[]
  idx: number
  setEmails: React.Dispatch<React.SetStateAction<string[]>>
}
