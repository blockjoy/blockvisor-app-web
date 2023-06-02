import { useRecoilValue } from 'recoil';
import { styles } from './HostViewDetails.styles';
import { DetailsTable } from '@shared/components';
import { FormHeaderCaps } from '@shared/components';
import { hostAtoms, mapHostToDetails } from '@modules/host';

export const HostViewDetails = () => {
  const host = useRecoilValue(hostAtoms.activeHost);

  const details = mapHostToDetails(host!);

  return (
    <section css={styles.section}>
      <FormHeaderCaps noBottomMargin>Main</FormHeaderCaps>
      <DetailsTable bodyElements={details} />
    </section>
  );
};
