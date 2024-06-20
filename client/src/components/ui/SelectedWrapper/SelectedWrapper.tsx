import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '..'
import { FC } from 'react'
import { OptionWithRevealProps } from './SelectedWrapper.types'

export const SelectedWrapper: FC<OptionWithRevealProps> = ({
  id,
  title,
  className,
  slectedValuePLaceHolder,
  data,
  htmlFor,
  disabled,
  error,
  setValue,
}) => {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>{title}</Label>
      <Select onValueChange={(value) => setValue(() => value)} disabled={disabled}>
        <SelectTrigger id={id} className={error ? 'bg-red-700/5 border-red-700/35' : ''}>
          <SelectValue placeholder={slectedValuePLaceHolder} />
        </SelectTrigger>
        <SelectContent className="h-[245px]">
          <SelectGroup>
            {data.map((item, i) => {
              return (
                <SelectItem key={i + 's'} value={item}>
                  {item}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
