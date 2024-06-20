import { Input } from '../Input'
import { Label } from '../Label'
import { InputWrapperType } from './InputWrapper.types'

export const InputWrapper = ({ value, label, setValue, error }: InputWrapperType) => {
  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <Input
        value={value}
        className={error ? 'bg-red-700/5 border-red-700/35' : ''}
        type="text"
        id={label}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
        placeholder={`enter your ${label}`}
      />
    </div>
  )
}
