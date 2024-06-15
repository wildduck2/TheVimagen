import { RefObject } from 'react'

const clearInput = (input: RefObject<HTMLInputElement>) => {
  input.current!.value = ''
  input.current!.blur()
}

export { clearInput }
