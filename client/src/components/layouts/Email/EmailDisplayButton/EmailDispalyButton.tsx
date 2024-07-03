import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { EmaildispalyButtonType } from './EmailDispalyButton.types'

export const EmailDisplayButton = ({ icon, label, emailSelectedId }: EmaildispalyButtonType) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" disabled={!emailSelectedId.length}>
          {icon}
          <span className="sr-only">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
