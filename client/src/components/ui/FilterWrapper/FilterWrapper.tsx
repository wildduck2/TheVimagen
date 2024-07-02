import { Button } from '..'
import { FilterWrapperProps } from './FilterWrapper.types'
import { Icon } from '@/assets'

const FilterWrapper = ({ className }: FilterWrapperProps) => {
  return (
    <>
      <Button variant="ghost" className="text-lg gap-2 flex">
        <Icon.mixerHorizontal className="size-[25px]" />
        <span className="font-semibold">Filter</span>
      </Button>
    </>
  )
}

export { FilterWrapper }
