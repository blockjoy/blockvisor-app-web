import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useNodeView } from '@modules/node';
import { ActionsDropdown, ActionsDropdownItem } from '@shared/components';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconStop from '@public/assets/icons/app/NodeStop.svg';
import IconStart from '@public/assets/icons/app/NodeStart.svg';
import IconWarning from '@public/assets/icons/common/Warning.svg';
import IconAdmin from '@public/assets/icons/app/Sliders.svg';
import { authSelectors } from '@modules/auth';

type Props = {
  onDeleteClicked: VoidFunction;
  onReportProblemClicked: VoidFunction;
};

export const NodeViewHeaderActions = ({
  onDeleteClicked,
  onReportProblemClicked,
}: Props) => {
  const router = useRouter();
  const { node, stopNode, startNode } = useNodeView();

  const handleStop = () => stopNode(node?.id);
  const handleStart = () => startNode(node?.id);
  const handleAdminClicked = () =>
    router.push(`/admin?name=nodes&id=${node?.id}`);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const canDelete = useRecoilValue(authSelectors.hasPermission('node-delete'));
  const canStart = useRecoilValue(authSelectors.hasPermission('node-start'));
  const canStop = useRecoilValue(authSelectors.hasPermission('node-stop'));
  const canReport = useRecoilValue(authSelectors.hasPermission('node-report'));

  const items: ActionsDropdownItem[] = [];

  if (isSuperUser) {
    items.push({
      name: 'Admin',
      icon: <IconAdmin />,
      onClick: handleAdminClicked,
    });
  }

  if (canStop) {
    items.push({ name: 'Stop', icon: <IconStop />, onClick: handleStop });
  }

  if (canStart) {
    items.push({ name: 'Start', icon: <IconStart />, onClick: handleStart });
  }

  if (canReport) {
    items.push({
      name: 'Report Problem',
      icon: <IconWarning />,
      onClick: onReportProblemClicked,
    });
  }

  if (canDelete) {
    items.push({
      name: 'Delete',
      icon: <IconDelete />,
      onClick: onDeleteClicked,
      hasBorderTop: true,
    });
  }

  return items.length ? <ActionsDropdown items={items} /> : null;
};
