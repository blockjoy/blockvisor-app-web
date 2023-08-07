import { useRecoilValue } from 'recoil';
import { styles } from './HostViewDetails.styles';
import { DetailsTable, FormHeaderCaps } from '@shared/components';
import {
  hostAtoms,
  mapHostToDetails,
  mapHostToDetailsLaunch,
} from '@modules/host';

export const HostViewDetails = () => {
  const host = useRecoilValue(hostAtoms.activeHost);

  const details = mapHostToDetails(host!);
  const launchDetails = mapHostToDetailsLaunch(host!);

  return (
    <>
      <section css={styles.section}>
        <DetailsTable bodyElements={details} />
      </section>
      <section css={styles.section}>
        <FormHeaderCaps noBottomMargin>Launch Details</FormHeaderCaps>
        <DetailsTable bodyElements={launchDetails} />
      </section>
    </>
  );
};
