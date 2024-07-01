import React from 'react'

import { FilterWrapper, Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui'
import { FileMainEreaBodyKanban, FileMainEreaBodyTable } from './'
import { Icon } from '@/assets'

const buttons = [
  {
    id: 1,
    name: 'Kanban',
    icon: <Icon.squareKanban/>,
  },
  {
    id: 2,
    name: 'Table',
    icon: <Icon.table/>,
  },
  {
    id: 3,
    name: 'List View',
    icon: <Icon.list/>,
  },
]

const FileMainEreaNav = () => {
  return (
    <ul>
      <Tabs defaultValue="Kanban" className="file-mainerea__nav-wrapper">
        <TabsList className="file-mainerea__nav-wrapper__nav">
          <ul>
            {buttons.map((button) => (
              <TabsTrigger key={button.id} className="file-mainerea__nav-wrapper__nav__trigger" value={button.name}>
                <button.icon  className={'size-[20px]'} />
                <span>{button.name}</span>
              </TabsTrigger>
            ))}
          </ul>
          <FilterWrapper className="file-mainerea__nav-wrapper__filter" />
        </TabsList>
        <TabsContent value="Kanban">
          <FileMainEreaBodyKanban />
        </TabsContent>
        <TabsContent value="Table">
          <FileMainEreaBodyTable />
        </TabsContent>
        <TabsContent value="List View">
          <FileMainEreaBodyTable />
        </TabsContent>
      </Tabs>
    </ul>
  )
}

export default FileMainEreaNav
