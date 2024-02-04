import React from 'react';

import { FilterWrapper, Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui';
import { FileMainEreaBodyKanban, FileMainEreaBodyTable } from './';
import { KanbanSquare, List, Table } from 'lucide-react';

const buttons = [
  {
    id: 1,
    name: 'Kanban',
    icon: KanbanSquare,
  },
  {
    id: 2,
    name: 'Table',
    icon: Table,
  },
  {
    id: 3,
    name: 'List View',
    icon: List,
  },
];

const FileMainEreaNav = () => {
  return (
    <ul>
      <Tabs defaultValue="Kanban" className="file-mainerea__nav-wrapper">
        <TabsList className="file-mainerea__nav-wrapper__nav">
          <ul>
            {buttons.map((button) => (
              <TabsTrigger key={button.id} className="file-mainerea__nav-wrapper__nav__trigger" value={button.name}>
                <button.icon size={20} />
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
  );
};

export default FileMainEreaNav;
