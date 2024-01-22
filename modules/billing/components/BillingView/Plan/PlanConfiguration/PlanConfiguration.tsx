import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Item,
  ItemPrice,
  PaymentSource,
} from 'chargebee-typescript/lib/resources';
import {
  useSubscription,
  billingSelectors,
  usePaymentMethods,
  PaymentMethodsDropdown,
  PlanParamsInfo,
  DEFAULT_BILLING_PERIOD,
} from '@modules/billing';
import {
  Alert,
  Button,
  ButtonGroup,
  Checklist,
  TableSkeleton,
} from '@shared/components';
import { Total } from '@shared/components';
import { spacing, divider } from 'styles/utils.spacing.styles';
import { styles } from './PlanConfiguration.styles';
import { containers } from 'styles/containers.styles';

export type PlanConfigurationProps = {
  item: Item | null;
  itemPrices: ItemPrice[];
  handleCancel: VoidFunction;
};

export const PlanConfiguration = ({
  item,
  handleCancel,
  itemPrices,
}: PlanConfigurationProps) => {
  const { createSubscription, subscriptionLoadingState } = useSubscription();
  const { paymentMethods, paymentMethodsLoadingState } = usePaymentMethods();

  const customer = useRecoilValue(billingSelectors.customer);

  const [periodUnit, setPeriodUnit] = useState<string>(DEFAULT_BILLING_PERIOD);
  const [paymentMethodId, setPaymentMethodId] = useState<string | undefined>(
    customer?.primary_payment_source_id,
  );

  const activeItemPrice: ItemPrice | undefined = itemPrices?.find(
    (itemPrice: ItemPrice) => itemPrice.period_unit === periodUnit,
  );

  const handlePaymentMethod = (paymentMethod: PaymentSource) => {
    setPaymentMethodId(paymentMethod.id);
  };

  const handleSubscription = () => {
    if (!activeItemPrice || !paymentMethodId) return;

    createSubscription({
      itemPriceId: activeItemPrice?.id,
      paymentMethodId,
    });
  };

  if (paymentMethodsLoadingState !== 'finished') return <TableSkeleton />;

  return (
    <div css={containers.mediumSmall}>
      <h2 css={[styles.planTitle, spacing.bottom.medium]}>
        {item?.external_name}
      </h2>

      <div css={[divider, spacing.bottom.medium]}></div>

      {/* <PlanParams periodUnit={periodUnit} handlePeriodUnit={handlePeriodUnit} /> */}
      <PlanParamsInfo periodUnit={periodUnit} />

      <div css={spacing.bottom.medium}>
        <h3 css={styles.headline}>Payment Method</h3>
        <PaymentMethodsDropdown
          primaryId={paymentMethodId}
          handlePaymentMethod={handlePaymentMethod}
        />
      </div>

      {item?.metadata?.features && (
        <div css={spacing.bottom.medium}>
          <h3 css={styles.headline}>What you get</h3>
          <Checklist items={item?.metadata?.features} />
        </div>
      )}

      <div css={[divider, spacing.bottom.mediumSmall]}></div>

      <Total total={activeItemPrice?.price!} />

      {(!paymentMethodId || !paymentMethods.length) && (
        <div css={spacing.top.medium}>
          <Alert>Please update your payment information.</Alert>
        </div>
      )}

      <ButtonGroup type="flex">
        <Button
          style="secondary"
          size="small"
          disabled={!paymentMethodId || !paymentMethods.length}
          loading={subscriptionLoadingState !== 'finished'}
          onClick={handleSubscription}
        >
          Confirm
        </Button>
        <Button style="outline" size="small" onClick={handleCancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
};
