import { useEffect, useState } from 'react';
import {
  Item,
  ItemPrice,
  PaymentSource,
} from 'chargebee-typescript/lib/resources';
import {
  calcNextAutoRenew,
  useItems,
  useSubscription,
  BILLING_PLAN_FEATURES,
  billingAtoms,
  PaymentMethodsSelect,
  usePaymentMethods,
} from '@modules/billing';
import {
  Button,
  Switch,
  RadioButton,
  RadioButtonGroup,
} from '@shared/components';
import { formatters, TableSkeleton } from '@shared/index';
import { flex } from 'styles/utils.flex.styles';
import { spacing, divider } from 'styles/utils.spacing.styles';
import { styles } from './PlanSelect.styles';
import IconCheck from '@public/assets/icons/check-16.svg';
import { useRecoilValue } from 'recoil';

export type PlanSelectProps = {
  plan: Item | null;
  handleCancel: VoidFunction;
};

export const PlanSelect = ({ plan, handleCancel }: PlanSelectProps) => {
  const { createSubscription, subscriptionLoadingState } = useSubscription();
  const { itemPrices, itemPricesLoadingState, getItemPrices } = useItems();
  const { getPaymentMethods } = usePaymentMethods();

  const customer = useRecoilValue(billingAtoms.customer);

  const [periodUnit, setPeriodUnit] = useState<string>('year');
  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  const [paymentMethodId, setPaymentMethodId] = useState<string | undefined>(
    customer?.primary_payment_source_id,
  );

  useEffect(() => {
    getItemPrices({ id: plan?.id! });

    getPaymentMethods({
      customer_id: { is: customer?.id },
      type: { is: 'card' },
    });
  }, []);

  const activeItemPrice: ItemPrice = itemPrices?.find(
    (itemPrice: ItemPrice) => itemPrice.period_unit === periodUnit,
  );

  const handlePeriodUnit = (e: any) => {
    const { value } = e.target;
    setPeriodUnit(value);
  };

  const handleAutoRenew = () => setAutoRenew(!autoRenew);

  const handlePaymentMethod = (paymentMethod: PaymentSource) => {
    setPaymentMethodId(paymentMethod.id);
  };

  const handleSubscription = () => {
    createSubscription({
      itemPriceId: activeItemPrice?.id,
      autoRenew,
      paymentMethodId,
    });
  };

  return (
    <>
      {itemPricesLoadingState !== 'finished' ? (
        <TableSkeleton />
      ) : (
        <div css={styles.wrapper}>
          <div css={spacing.bottom.medium}>
            <p css={styles.planTitle}>{plan?.external_name}</p>
          </div>
          <div css={[divider, spacing.bottom.medium]}></div>
          <div css={spacing.bottom.large}>
            <h3 css={styles.headline}>Billing period</h3>
            <RadioButtonGroup>
              <RadioButton
                id="month"
                name="periodUnit"
                value="month"
                selectedValue={periodUnit}
                onChange={handlePeriodUnit}
              >
                Monthly
              </RadioButton>
              <RadioButton
                id="year"
                name="periodUnit"
                value="year"
                selectedValue={periodUnit}
                onChange={handlePeriodUnit}
              >
                Yearly
              </RadioButton>
            </RadioButtonGroup>
          </div>
          <div css={spacing.bottom.large}>
            <h3 css={styles.headline}>Auto renew</h3>
            <div css={[flex.display.flex, flex.justify.between]}>
              <p css={styles.renewText}>
                Your subscription will automatically renew on{' '}
                {formatters.formatDate(calcNextAutoRenew(periodUnit))}
              </p>
              <Switch
                name="autoRenew"
                additionalStyles={styles.renewSwitch}
                disabled={false}
                tooltip="Subscription's auto renewal"
                checked={autoRenew}
                onPropertyChanged={handleAutoRenew}
              />
            </div>
          </div>
          <div css={spacing.bottom.medium}>
            <h3 css={styles.headline}>Payment Method</h3>
            <PaymentMethodsSelect
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
          <div css={styles.buttons}>
            <Button
              style="secondary"
              size="medium"
              customCss={[styles.button]}
              loading={subscriptionLoadingState !== 'finished'}
              onClick={handleSubscription}
            >
              Confirm
            </Button>
            <Button style="outline" size="medium" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
