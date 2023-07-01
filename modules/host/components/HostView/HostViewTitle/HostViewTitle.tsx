import { Copy, PageTitle, Skeleton } from '@shared/components';
import { styles } from './HostViewTitle.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '@shared/constants/routes';
import { NodeTitle } from '@modules/node';
import { useHostView } from '@modules/host';
import IconHost from '@public/assets/icons/app/Host.svg';

export const HostViewTitle = () => {
  const router = useRouter();

  const { host, isLoading } = useHostView();

  const handleHostsClicked = () => router.push(ROUTES.HOSTS);

  return (
    <PageTitle
      title="Hosts"
      onTitleClick={handleHostsClicked}
      childTitle={host?.id}
      icon={<IconHost />}
      isLoading={isLoading === 'loading'}
      canCopyChild
    />
  );
};
