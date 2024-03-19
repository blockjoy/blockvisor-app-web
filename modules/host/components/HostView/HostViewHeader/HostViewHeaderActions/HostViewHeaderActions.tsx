import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { ActionsDropdown, ActionsDropdownItem } from '@shared/components';
import { useHostView } from '@modules/host/hooks/useHostView';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconAdmin from '@public/assets/icons/app/Sliders.svg';
import { authSelectors } from '@modules/auth';

type Props = {
  onDeleteClicked: VoidFunction;
};

export const HostViewHeaderActions = ({ onDeleteClicked }: Props) => {
  const router = useRouter();
  const { host } = useHostView();

  const handleAdminClicked = () =>
    router.push(`/admin?name=hosts&id=${host?.id}`);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const canDelete = useRecoilValue(authSelectors.hasPermission('host-delete'));

  const items: ActionsDropdownItem[] = [];

  if (isSuperUser) {
    items.push({
      name: 'Admin',
      icon: <IconAdmin />,
      onClick: handleAdminClicked,
    });
  }

  if (canDelete) {
    items.push({
      name: 'Delete',
      icon: <IconDelete />,
      onClick: onDeleteClicked,
      hasBorderTop: isSuperUser,
    });
  }

  return items.length ? <ActionsDropdown items={items} /> : null;
};
