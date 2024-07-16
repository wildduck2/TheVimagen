import { Avatar, AvatarFallback, AvatarImage, HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui'
import { EmailProfileProps } from './EmailProfile.types'
import { CalendarDays } from 'lucide-react'
export const EmailProfile = ({ trigger, replyTo, profileImg }: EmailProfileProps) => {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div>{trigger}</div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src={profileImg} />
              <AvatarFallback>{replyTo.split('@')[1].split('.')[0].split('')[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{replyTo}</h4>
              <p className="text-sm">the place where nerds belonog to.</p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-xs text-muted-foreground">Joined December 2013</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  )
}
