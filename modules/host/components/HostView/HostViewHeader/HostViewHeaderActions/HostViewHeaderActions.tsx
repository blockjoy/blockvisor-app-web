import { ActionsDropdown, ActionsDropdownItem } from '@shared/components';
import { usePermissions } from '@modules/auth/hooks/usePermissions';
import { useRouter } from 'next/router';
import { useHostView } from '@modules/host/hooks/useHostView';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconAdmin from '@public/assets/icons/app/Sliders.svg';

type Props = {
  onDeleteClicked: VoidFunction;
};

export const HostViewHeaderActions = ({ onDeleteClicked }: Props) => {
  const router = useRouter();
  const { host } = useHostView();

  const handleAdminClicked = () =>
    router.push(`/admin?name=hosts&id=${host?.id}`);

  const { hasPermission, isSuperUser } = usePermissions();

  const canDelete = hasPermission('host-delete');

  const items: ActionsDropdownItem[] = [];

  if (isSuperUser) {
    items.push({
      title: 'Admin',
      icon: <IconAdmin />,
      method: handleAdminClicked,
    });
  }

  if (canDelete) {
    items.push({
      title: 'Delete',
      icon: <IconDelete />,
      method: onDeleteClicked,
      hasBorderTop: isSuperUser,
    });
  }

  return items.length ? <ActionsDropdown items={items} /> : null;
};
