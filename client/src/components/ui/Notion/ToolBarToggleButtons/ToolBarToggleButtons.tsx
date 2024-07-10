import { MouseEvent, ToggleToolTipButtonWrapper, ToolBarToggleButtonsProps } from '..'
import { bubbleMenuIconsData } from '@/constants'

export const ToolBarToggleButtons = ({ commands, states }: ToolBarToggleButtonsProps) => {
  return (
    <>
      <div className="bubble__menu__wrapper__icons">
        {bubbleMenuIconsData.map((item, idx) => (
          <ToggleToolTipButtonWrapper
            key={idx}
            tip="Bold"
            value={states[item.value]}
            onClick={commands[item.action] as MouseEvent}
            children={<item.icon />}
          />
        ))}
      </div>
    </>
  )
}
