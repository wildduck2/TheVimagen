import { mails } from '@/constants/Email/MailData'
import { atom, useAtom } from 'jotai'

type Config = {
  selected: string | null
}

const configAtom = atom<Config>({
  selected: mails[0].id,
})

export function useMail() {
  return useAtom(configAtom)
}
