import { useRecoilValue } from 'recoil';
import { billingAtoms, mapSubscriptionToDetails } from '@modules/billing';
import { DetailsTable } from '@shared/components';
import { containers } from 'styles/containers.styles';
import { styles } from './SubscriptionInfo.styles';

export const SubscriptionInfo = () => {
  const subscription = useRecoilValue(billingAtoms.subscription);

  const subscriptionData = mapSubscriptionToDetails(subscription!);

  return (
    <div css={[styles.tableRows, containers.mediumSmall]}>
      <DetailsTable bodyElements={subscriptionData} />
    </div>
  );
};
