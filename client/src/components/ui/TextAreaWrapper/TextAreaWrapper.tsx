import { Label } from '../Label'
import { Textarea } from '../TextArea'
import { TextAreaWrapperType } from './TextAreaWrapper.types'

export const TextAreaWrapper = ({ label, value, setValue, error }: TextAreaWrapperType) => {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Textarea
        className={error ? 'bg-red-700/5 border-red-700/35' : ''}
        placeholder="Type your message here."
        id={label}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
        value={value}
      />
      <p className="text-sm text-muted-foreground">Your message will be copied to the support team.</p>
    </div>
  )
}
