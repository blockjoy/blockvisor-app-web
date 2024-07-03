import { useRecoilValue } from 'recoil';
import { billingSelectors, mapSubscriptionToDetails } from '@modules/billing';
import { DetailsTable } from '@shared/components';
import { containers } from 'styles/containers.styles';
import { styles } from './SubscriptionInfo.styles';

export const SubscriptionInfo = () => {
  const subscription = useRecoilValue(billingSelectors.subscription);

  const subscriptionData = mapSubscriptionToDetails(subscription!);

  return (
    <div css={[styles.tableRows, containers.mediumSmall]}>
      <DetailsTable bodyElements={subscriptionData} />
    </div>
  );
};
