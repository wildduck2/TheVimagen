import React from 'react'

import { Maile } from './Email'
import { accounts, mails } from '../../../constants'

export default function MailPage() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <Maile mails={mails} accounts={accounts} navCollapsedSize={3} defaultLayout={defaultLayout} />
      </div>
    </>
  )
}
