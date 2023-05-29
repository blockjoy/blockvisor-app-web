import { DetailsTable } from '@shared/components';
import { FormHeaderCaps } from '@shared/components';
import { styles } from './HostViewDetails.styles';
import { useRecoilValue } from 'recoil';
import { hostAtoms } from '@modules/host/store/hostAtoms';
import { mapHostToDetails } from '@modules/host/utils/mapHostToDetails';

export const HostViewDetails = () => {
  const host = useRecoilValue(hostAtoms.activeHost);

  const details = mapHostToDetails(host!);

  return (
    <>
      <section css={styles.section}>
        <FormHeaderCaps noBottomMargin>Main</FormHeaderCaps>
        <DetailsTable bodyElements={details} />
      </section>
    </>
  );
};
