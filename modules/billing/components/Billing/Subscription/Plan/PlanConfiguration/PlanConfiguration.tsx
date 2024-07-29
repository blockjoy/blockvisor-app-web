import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { PaymentMethod } from '@modules/grpc/library/blockjoy/v1/org';
import {
  useSubscription,
  billingSelectors,
  usePaymentMethods,
  PaymentMethodsDropdown,
  PlanParamsInfo,
  PLAN_ITEM,
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
  handleCancel: VoidFunction;
};

export const PlanConfiguration = ({ handleCancel }: PlanConfigurationProps) => {
  const { createSubscription, subscriptionLoadingState } = useSubscription();
  const { paymentMethods, paymentMethodsLoadingState } = usePaymentMethods();

  // const customer = useRecoilValue(billingSelectors.customer);

  // const [paymentMethodId, setPaymentMethodId] = useState<string | undefined>(
  //   customer?.primary_payment_source_id,
  // );

  const customer = null;
  const paymentMethodId = '';

  const handlePaymentMethod = (paymentMethod: PaymentMethod) => {
    // setPaymentMethodId(paymentMethod.id);
  };

  const handleSubscription = async () => {
    if (!paymentMethodId) return;

    // await createSubscription({
    //   itemPriceId: activeItemPrice?.id,
    //   paymentMethodId,
    // });

    toast.success('Subscription created');
  };

  if (paymentMethodsLoadingState !== 'finished') return <TableSkeleton />;

  return (
    <div css={containers.mediumSmall}>
      <h2 css={[styles.planTitle, spacing.bottom.medium]}>{PLAN_ITEM.title}</h2>

      <div css={[divider, spacing.bottom.medium]}></div>

      {/* <PlanParams periodUnit={periodUnit} handlePeriodUnit={handlePeriodUnit} /> */}
      <PlanParamsInfo periodUnit="month" />

      <div css={spacing.bottom.medium}>
        <h3 css={styles.headline}>Payment Method</h3>
        <PaymentMethodsDropdown
          primaryId={paymentMethodId}
          handlePaymentMethod={handlePaymentMethod}
        />
      </div>

      {PLAN_ITEM?.features && (
        <div css={spacing.bottom.medium}>
          <h3 css={styles.headline}>What you get</h3>
          <Checklist items={PLAN_ITEM.features} />
        </div>
      )}

      <div css={[divider, spacing.bottom.mediumSmall]}></div>

      <Total total={0} />

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
