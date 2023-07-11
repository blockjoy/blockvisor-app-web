import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Item,
  ItemPrice,
  PaymentSource,
} from 'chargebee-typescript/lib/resources';
import {
  useSubscription,
  BILLING_PLAN_FEATURES,
  billingSelectors,
  usePaymentMethods,
  PlanParams,
  PaymentMethodsDropdown,
} from '@modules/billing';
import { Alert, Button, ButtonGroup, SvgIcon } from '@shared/components';
import { formatters, TableSkeleton } from '@shared/index';
import { flex } from 'styles/utils.flex.styles';
import { spacing, divider } from 'styles/utils.spacing.styles';
import { styles } from './PlanConfiguration.styles';
import IconCheck from '@public/assets/icons/common/Check.svg';

export type PlanConfigurationProps = {
  plan: Item | null;
  itemPrices: ItemPrice[];
  handleCancel: VoidFunction;
};

export const PlanConfiguration = ({
  plan,
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
    getPaymentMethods();
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
    if (!activeItemPrice || !paymentMethodId) {
      console.error('Missing required fields');
      return;
    }

    createSubscription({
      itemPriceId: activeItemPrice?.id,
      autoRenew,
      paymentMethodId,
    });
  };

  if (paymentMethodsLoadingState !== 'finished') return <TableSkeleton />;

  return (
    <div css={styles.wrapper}>
      <div css={spacing.bottom.medium}>
        <p css={styles.planTitle}>{plan?.external_name}</p>
      </div>
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
      <div css={spacing.bottom.medium}>
        <h3 css={styles.headline}>What you get</h3>
        <ul css={styles.features}>
          {BILLING_PLAN_FEATURES.map(
            (feature: string, featureIndex: number) => (
              <li key={featureIndex}>
                <span css={styles.summaryIcon}>
                  <IconCheck />
                </span>
                <span>{feature}</span>
              </li>
            ),
          )}
        </ul>
      </div>
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
          customCss={[styles.button]}
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
