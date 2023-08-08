import {
  Amount,
  BillingAmount,
  Currency,
  Period,
} from '@modules/grpc/library/blockjoy/common/v1/currency';

export const formatAmount = (amount: Amount): string => {
  let formattedValue = amount.value.toFixed(2);

  switch (amount.currency) {
    case Currency.CURRENCY_USD:
      return `$${formattedValue}`;
    case Currency.CURRENCY_UNSPECIFIED:
      return `${amount.value}`;
    case Currency.UNRECOGNIZED:
    default:
      return `Unknown Currency: ${amount.value}`;
  }
};

export const formatBillingAmount = (billingAmount: BillingAmount): string => {
  if (!billingAmount.amount) return '';

  const amountStr = formatAmount(billingAmount.amount);

  switch (billingAmount.period) {
    case Period.PERIOD_MONTHLY:
      return `${amountStr} / month`;
    case Period.PERIOD_UNSPECIFIED:
      return amountStr;
    case Period.UNRECOGNIZED:
    default:
      return `${amountStr} / unknown period`;
  }
};
