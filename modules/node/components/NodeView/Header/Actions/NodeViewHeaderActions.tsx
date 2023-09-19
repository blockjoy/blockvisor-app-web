import { useNodeView } from '@modules/node';
import { ActionsDropdown } from '@shared/components';
import { usePermissions } from '@modules/auth/hooks/usePermissions';
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

  const { hasPermission } = usePermissions();

  const canDelete = hasPermission('node-delete');
  const canStart = hasPermission('node-start');
  const canStop = hasPermission('node-stop');

  const items = [];

  if (canStop) {
    items.push({ title: 'Stop', icon: <IconStop />, method: handleStop });
  }

  if (canStart) {
    items.push({ title: 'Start', icon: <IconStart />, method: handleStart });
  }

  if (canDelete) {
    items.push({
      title: 'Delete',
      icon: <IconDelete />,
      method: onDeleteClicked,
    });
  }

  return items.length ? <ActionsDropdown items={items} /> : null;
};
