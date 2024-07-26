export type HandleAddEmailSubmitProps = {
  emailRef: React.MutableRefObject<HTMLInputElement>
  emails: string[]
  setEmails: React.Dispatch<React.SetStateAction<string[]>>
}

export type HandleRemoveEmailProps = {
  emails: string[]
  idx: number
  setEmails: React.Dispatch<React.SetStateAction<string[]>>
}
