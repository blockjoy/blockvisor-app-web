import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useNodeView } from '@modules/node';
import { ActionsDropdown, ActionsDropdownItem } from '@shared/components';
import { authSelectors } from '@modules/auth';
import { ContainerStatus } from '@modules/grpc/library/blockjoy/common/v1/node';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconStop from '@public/assets/icons/app/NodeStop.svg';
import IconStart from '@public/assets/icons/app/NodeStart.svg';
import IconRestart from '@public/assets/icons/app/NodeRestart.svg';
import IconRecreate from '@public/assets/icons/app/NodeRecreate.svg';
import IconWarning from '@public/assets/icons/common/Warning.svg';
import IconAdmin from '@public/assets/icons/app/Sliders.svg';

type NodeViewHeaderActionsProps = {
  handleActionView: (action: NodeAction) => void;
};

export const NodeViewHeaderActions = ({
  handleActionView,
}: NodeViewHeaderActionsProps) => {
  const router = useRouter();

  const { node, stopNode, startNode } = useNodeView();

  const handleStop = () => stopNode(node?.id);

  const handleStart = () => startNode(node?.id);

  const handleAdminClicked = () =>
    router.push(`/admin?name=nodes&id=${node?.id}`);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const canCreate = useRecoilValue(authSelectors.hasPermission('node-create'));
  const canGetSecret = useRecoilValue(
    authSelectors.hasPermission('crypt-get-secret'),
  );
  const canPutSecret = useRecoilValue(
    authSelectors.hasPermission('crypt-put-secret'),
  );

  const canDelete = useRecoilValue(authSelectors.hasPermission('node-delete'));

  const canDeleteAdmin = useRecoilValue(
    authSelectors.hasPermission('node-admin-delete'),
  );

  const canStart = useRecoilValue(authSelectors.hasPermission('node-start'));

  const canStartAdmin = useRecoilValue(
    authSelectors.hasPermission('node-admin-start'),
  );

  const canStop = useRecoilValue(authSelectors.hasPermission('node-stop'));

  const canStopAdmin = useRecoilValue(
    authSelectors.hasPermission('node-admin-stop'),
  );

  const canReport = useRecoilValue(authSelectors.hasPermission('node-report'));

  const items: ActionsDropdownItem[] = [];

  const canRecreate = canCreate && canGetSecret && canPutSecret;

  const handleDeleteClicked = () => handleActionView('delete');
  const handleRecreateClicked = () => handleActionView('recreate');
  const handleReportClicked = () => handleActionView('report');

  if (isSuperUser) {
    items.push({
      name: 'Admin',
      icon: <IconAdmin />,
      onClick: handleAdminClicked,
    });
  }

  if (canStop || canStopAdmin) {
    items.push({ name: 'Stop', icon: <IconStop />, onClick: handleStop });
  }

  if (canStart || canStartAdmin) {
    if (node?.containerStatus === ContainerStatus.CONTAINER_STATUS_STOPPED) {
      items.push({ name: 'Start', icon: <IconStart />, onClick: handleStart });
    } else {
      items.push({
        name: 'Restart',
        icon: <IconRestart />,
        onClick: handleStart,
      });
    }
  }

  if (canReport) {
    items.push({
      name: 'Report Problem',
      icon: <IconWarning />,
      onClick: handleReportClicked,
    });
  }

  if (canRecreate) {
    items.push({
      name: 'Recreate',
      icon: <IconRecreate />,
      onClick: handleRecreateClicked,
      hasBorderTop: true,
    });
  }

  if (canDelete || canDeleteAdmin) {
    items.push({
      name: 'Delete',
      icon: <IconDelete />,
      onClick: handleDeleteClicked,
      hasBorderTop: !canRecreate,
    });
  }

  return items.length ? <ActionsDropdown items={items} /> : null;
};
