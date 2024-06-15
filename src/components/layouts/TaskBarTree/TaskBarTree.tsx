import { AccordionGroup } from '..';
import { TheDialogagen } from '../../ui';

const TaskBarTree = () => {
  return (
    <>
      <div className="files-tree">
        <div>
          <TheDialogagen keyValue="s" />
          <AccordionGroup data={null} />
        </div>
      </div>
    </>
  );
};

export default TaskBarTree;
