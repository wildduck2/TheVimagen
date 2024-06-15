import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '..'
import React, { FC } from 'react'
import { OptionWithRevealProps } from './SelectWrapper.types'

export const SelectedWrapper: FC<OptionWithRevealProps> = ({ title, slectedValuePLaceHolder, data }) => {
  return (
    <div className="dialog-content__form__group__input">
      <Label htmlFor="category">{title}</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={slectedValuePLaceHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((item, i) => {
              return (
                <SelectItem key={i} value={item}>
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
