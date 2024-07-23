// import React, { useCallback } from 'react'
//
// import { Placement, Props } from 'tippy.js'
// import { Button, TooltipContent, TooltipProvider, TooltipTrigger } from '..'
//
// export interface TooltipProps {
//   children?: string | React.ReactNode
//   enabled?: boolean
//   title?: string
//   shortcut?: string[]
//   tippyOptions?: Omit<Partial<Props>, 'content'>
//   content?: React.ReactNode
// }
//
// export interface TippyProps {
//   'data-placement': Placement
//   'data-reference-hidden'?: string
//   'data-escaped'?: string
// }
//
// const isMac = typeof window !== 'undefined' ? navigator.platform.toUpperCase().indexOf('MAC') >= 0 : false
//
// const ShortcutKey = ({ children }: { children: string }): JSX.Element => {
//   const className =
//     'inline-flex items-center justify-center w-5 h-5 p-1 text-[0.625rem] rounded font-semibold leading-none border border-neutral-200 text-neutral-500 border-b-2'
//
//   if (children === 'Mod') {
//     return <kbd className={className}>{isMac ? '⌘' : 'Ctrl'}</kbd> // ⌃
//   }
//
//   if (children === 'Shift') {
//     return <kbd className={className}>⇧</kbd>
//   }
//
//   if (children === 'Alt') {
//     return <kbd className={className}>{isMac ? '⌥' : 'Alt'}</kbd>
//   }
//
//   return <kbd className={className}>{children}</kbd>
// }
//
// export const Tooltip = ({
//   children,
//   enabled = true,
//   title,
//   shortcut,
//   tippyOptions = {},
// }: TooltipProps): JSX.Element => {
//   return (
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button variant="outline">Hover</Button>
//       </TooltipTrigger>
//       <TooltipContent>
//         <p>Add to library</p>
//       </TooltipContent>
//     </Tooltip>
//   )
// }
//
// export default Tooltip
