//  
// import gsap from 'gsap'
//
// import { Label } from '..'
// import React from 'react'

export const buttons: Array<string[]> = [
  ['To Do', 'In Progress', 'Code Review'],
  ['PM Validation', 'Done'],
]

// const brnRowVariant = {
//   body: 'relative w-[300px]',
//   wrapper: 'flex items-center gap-4  w-[300px]',
//   secondContainer: 'grid gap-2 absolute top-0 left-0 w-[70px] h-[35px] overflow-hidden pointer-events-none',
// }
//
// const button: string[] = ['', 'translate-y-[-105%]', 'translate-y-[-105%]', 'translate-y-[105%]', 'translate-y-[105%]']

const OptionWithReveal = () => {
  // const containerRef = React.useRef<HTMLDivElement>(null)
  // const buttonRef = React.useRef<HTMLButtonElement>(null)
  //
  // // const [btn, setBtn] = React.useState<typeof buttons>(buttons)
  //
  // const gsapFirstButton = (e: React.MouseEvent<HTMLButtonElement>) => {
  //    e.currentTarget as HTMLButtonElement
  //   const tl = gsap.timeline()
  //   tl.set(containerRef.current, {
  //     width: '333px',
  //     height: '77px',
  //     pointerEvents: 'all',
  //   })
  //
  //   tl.to(
  //     '.btn-main',
  //     {
  //       ease: 'none',
  //       y: 0,
  //       stagger: 0.08,
  //     },
  //     `<`,
  //   )
  // }
  //
  // const gsapSecondButton = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const el = e.currentTarget
  //   const tl = gsap.timeline()
  //
  //   const zero = ['.btn-0-0', '.btn-0-1', '.btn-0-2', '.btn-1-0', '.btn-1-1', '.btn-1-2']
  //
  //   const smallFunctionToDefineTheBtnDirection = (buttonClass: string) => {
  //     const groupDefinder = buttonClass.slice(5, 6)
  //     tl.to(
  //       buttonClass,
  //       {
  //         duration: 0.3,
  //         y: groupDefinder === '0' ? '-100%' : '100%',
  //       },
  //       `<.1`,
  //     )
  //   }
  //   zero.map((btn) => {
  //     if (btn.slice(1) !== el.classList[0]) {
  //       smallFunctionToDefineTheBtnDirection(btn)
  //     } else {
  //       const groupDefinder = btn.slice(5, 6)
  //       const groupDefinder2 = btn.slice(7, 8)
  //
  //       const elBoundingCLientRect = containerRef.current!.querySelector(`.crap`)?.getBoundingClientRect()
  //       const height = elBoundingCLientRect?.height
  //       const width = elBoundingCLientRect?.width
  //
  //       tl.to(
  //         btn,
  //         {
  //           duration: 0.3,
  //           x: () => {
  //             if (groupDefinder === '0') {
  //               return groupDefinder2 === '1'
  //                 ? `-${width! + 16}`
  //                 : groupDefinder2 === '2'
  //                   ? `${-width! * 3.26 + 16}`
  //                   : '0'
  //             } else {
  //               return groupDefinder === '1' ? (groupDefinder2 !== '0' ? `-${width! * 1.85 + 16}` : '') : '0'
  //             }
  //           },
  //           y:
  //             groupDefinder === '1'
  //               ? groupDefinder2 === '0'
  //                 ? `-${height! + 8}`
  //                 : groupDefinder2 === '1'
  //                   ? `-${height! + 8}`
  //                   : '0'
  //               : '',
  //         },
  //         `<.1`,
  //       )
  //     }
  //   })
  // }
  //
  // return (
  //   <>
  //     <div className={brnRowVariant.body}>
  //       <div className="dialog-content__form__group__input">
  //         <Label htmlFor="category">Status</Label>
  //       </div>
  //       <div className={brnRowVariant.body}>
  //         <button ref={buttonRef} onClick={(e) => gsapFirstButton(e)}>
  //           To Do
  //         </button>
  //
  //         <div className={brnRowVariant.secondContainer} ref={containerRef}>
  //           {btn.map((btns, i) => {
  //             return (
  //               <div key={i} className={brnRowVariant.wrapper}>
  //                 {btns.map((btn, x) => {
  //                   return (
  //                     <button
  //                       key={x}
  //                       className={`btn-${i}-${x} ${i === 0 ? button[x] : button[x + 3]} ${
  //                         i === 0 && x === 0 ? 'crap' : 'btn-main'
  //                       }`}
  //                       onClick={(e) => gsapSecondButton(e)}
  //                     >
  //                       {btn}
  //                     </button>
  //                   )
  //                 })}
  //               </div>
  //             )
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // )
}

export { OptionWithReveal }
