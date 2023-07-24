import { useNodeView } from '@modules/node';
import { ActionsDropdown } from '@shared/components';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconStop from '@public/assets/icons/app/NodeStop.svg';
import IconStart from '@public/assets/icons/app/NodeStart.svg';

type Props = {
  onDeleteClicked: VoidFunction;
};

export const NodeViewHeaderActions = ({ onDeleteClicked }: Props) => {
  const { node, stopNode, startNode } = useNodeView();
  const handleStop = () => stopNode(node?.id);
  const handleStart = () => startNode(node?.id);

  return (
    <ActionsDropdown
      items={[
        { title: 'Stop', icon: <IconStop />, method: handleStop },
        { title: 'Start', icon: <IconStart />, method: handleStart },
        { title: 'Delete', icon: <IconDelete />, method: onDeleteClicked },
      ]}
    />
  );
};
