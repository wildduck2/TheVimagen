import { ToggleToolTipSpanWrapper } from '@/components/ui'
import { cn } from '@/utils'
import { Icon } from '@/assets'
import { ToggleFavoriateButtonType } from './ToggleFavoriateButton.types'
import { useToggleFavoriate } from '@/hooks'

export const ToggleFavoriateButton = ({ disabled, threads, tip }: ToggleFavoriateButtonType) => {
  const { startMutation, labelIds } = useToggleFavoriate({ threads })
  return (
    <ToggleToolTipSpanWrapper
      disabled={disabled}
      tip={tip}
      onClick={({ currentTarget }) => {
        startMutation.mutate()
        currentTarget.children[0].classList.toggle('active')
      }}
    >
      <Icon.fiStar className={cn('size-[1rem]', labelIds && 'active')} />
    </ToggleToolTipSpanWrapper>
  )
}
