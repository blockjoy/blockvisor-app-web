import { ChangeEvent, useEffect, useState } from 'react';
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
  PlanParams,
  PaymentMethodsDropdown,
} from '@modules/billing';
import {
  Alert,
  Button,
  ButtonGroup,
  List,
  TableSkeleton,
} from '@shared/components';
import { formatters } from '@shared/index';
import { flex } from 'styles/utils.flex.styles';
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
  const { paymentMethods, getPaymentMethods, paymentMethodsLoadingState } =
    usePaymentMethods();

  const customer = useRecoilValue(billingSelectors.customer);

  const [periodUnit, setPeriodUnit] = useState<string>('year');
  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  const [paymentMethodId, setPaymentMethodId] = useState<string | undefined>(
    customer?.primary_payment_source_id,
  );

  useEffect(() => {
    if (!paymentMethods || !paymentMethods.length) getPaymentMethods();
  }, []);

  const activeItemPrice: ItemPrice | undefined = itemPrices?.find(
    (itemPrice: ItemPrice) => itemPrice.period_unit === periodUnit,
  );

  const handlePeriodUnit = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPeriodUnit(value);
  };

  const handleAutoRenew = () => setAutoRenew(!autoRenew);

  const handlePaymentMethod = (paymentMethod: PaymentSource) => {
    setPaymentMethodId(paymentMethod.id);
  };

  const handleSubscription = () => {
    if (!activeItemPrice || !paymentMethodId) return;

    createSubscription({
      itemPriceId: activeItemPrice?.id,
      autoRenew,
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

      <PlanParams
        periodUnit={periodUnit}
        handlePeriodUnit={handlePeriodUnit}
        autoRenew={autoRenew}
        handleAutoRenew={handleAutoRenew}
      />

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
          <List items={item?.metadata?.features} />
        </div>
      )}

      <div css={[divider, spacing.bottom.medium]}></div>

      <div css={[flex.display.flex, flex.justify.between]}>
        <p css={styles.headline}>Total</p>
        <p css={styles.totalPrice}>
          {formatters.formatCurrency(activeItemPrice?.price!)}
        </p>
      </div>

      {(!paymentMethodId || !paymentMethods.length) && (
        <div css={spacing.top.medium}>
          <Alert>Please update your payment information.</Alert>
        </div>
      )}

      <ButtonGroup type="flex">
        <Button
          style="secondary"
          size="medium"
          disabled={!paymentMethodId || !paymentMethods.length}
          loading={subscriptionLoadingState !== 'finished'}
          onClick={handleSubscription}
        >
          Confirm
        </Button>
        <Button style="outline" size="medium" onClick={handleCancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
};
