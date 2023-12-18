import React from 'react'

import { FilterWrapper, Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui'
import { MainEreaBodyKanban, MainEreaBodyTable } from './'
import { KanbanSquare, List, Table } from 'lucide-react'

const buttons = [
    {
        id: 1,
        name: 'Kanban',
        icon: KanbanSquare
    },
    {
        id: 2,
        name: 'Table',
        icon: Table
    },
    {
        id: 3,
        name: 'List View',
        icon: List
    }
]



const MainEreaNav = () => {
    return (
        <ul>
            <Tabs defaultValue="Kanban" className="main-erea__nav-wrapper">
                <TabsList className="main-erea__nav-wrapper__nav">
                    <ul>
                        {
                            buttons.map((button) => (
                                <TabsTrigger key={button.id} className='main-erea__nav-wrapper__nav__trigger' value={button.name}>
                                    <button.icon size={20} />
                                    <span>{button.name}</span>
                                </TabsTrigger>
                            ))
                        }
                    </ul>
                    <FilterWrapper className='main-erea__nav-wrapper__filter'/>

                </TabsList>
                <TabsContent value="Kanban">
                    <MainEreaBodyKanban />
                </TabsContent>
                <TabsContent value="Table">
                    <MainEreaBodyTable />
                </TabsContent>
                <TabsContent value="List View">
                    <MainEreaBodyTable />
                </TabsContent>
            </Tabs>

        </ul>
    )
}


export default MainEreaNav

