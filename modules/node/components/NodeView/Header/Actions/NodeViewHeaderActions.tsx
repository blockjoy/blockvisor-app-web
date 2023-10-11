import { useNodeView } from '@modules/node';
import { ActionsDropdown } from '@shared/components';
import { usePermissions } from '@modules/auth/hooks/usePermissions';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconStop from '@public/assets/icons/app/NodeStop.svg';
import IconStart from '@public/assets/icons/app/NodeStart.svg';
import IconWarning from '@public/assets/icons/common/Warning.svg';

type Props = {
  onDeleteClicked: VoidFunction;
  onReportProblemClicked: VoidFunction;
};

export const NodeViewHeaderActions = ({
  onDeleteClicked,
  onReportProblemClicked,
}: Props) => {
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

  items.push({
    title: 'Report Problem',
    icon: <IconWarning />,
    method: onReportProblemClicked,
    hasBorderTop: true,
  });

  return items.length ? <ActionsDropdown items={items} /> : null;
};
