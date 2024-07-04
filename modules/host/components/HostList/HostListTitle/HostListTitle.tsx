import { useRecoilValue } from 'recoil';
import { PageTitle, PageTitleLabel } from '@shared/components';
import { hostAtoms } from '@modules/host';
import { styles } from './HostListTitle.styles';
import IconHost from '@public/assets/icons/app/Host.svg';

export const HostListTitle = () => {
  const isLoading = useRecoilValue(hostAtoms.isLoading);
  const hostCount = useRecoilValue(hostAtoms.hostCount);

  return (
    <PageTitle
      title="Hosts"
      icon={<IconHost />}
      label={
        <PageTitleLabel
          isLoading={isLoading !== 'finished'}
          isSuccess={hostCount > 0}
          label={`${hostCount}`}
          additionalStyles={[styles.pageTitle]}
        />
      }
    />
  );
};
