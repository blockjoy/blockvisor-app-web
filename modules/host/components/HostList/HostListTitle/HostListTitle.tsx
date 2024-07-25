import { useRecoilValue } from 'recoil';
import { PageTitle, PageTitleLabel } from '@shared/components';
import { hostAtoms } from '@modules/host';
import { styles } from './HostListTitle.styles';
import IconHost from '@public/assets/icons/app/Host.svg';

export const HostListTitle = () => {
  const hostListLoadingState = useRecoilValue(hostAtoms.hostListLoadingState);
  const hostCount = useRecoilValue(hostAtoms.hostCount);

  return (
    <PageTitle
      title="Hosts"
      icon={<IconHost />}
      label={
        <PageTitleLabel
          isLoading={hostListLoadingState !== 'finished'}
          isSuccess={hostCount > 0}
          label={`${hostCount}`}
          additionalStyles={[styles.pageTitle]}
        />
      }
    />
  );
};
