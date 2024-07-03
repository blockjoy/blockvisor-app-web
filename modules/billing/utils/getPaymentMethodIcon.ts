import dynamic from 'next/dynamic';

const IconAmericanExpress = dynamic(
  () => import(`@public/assets/icons/billing/AmericanExpress.svg`),
);
const IconMasterCard = dynamic(
  () => import(`@public/assets/icons/billing/MasterCard.svg`),
);
const IconVisa = dynamic(() => import(`@public/assets/icons/billing/Visa.svg`));
const IconDiscover = dynamic(
  () => import(`@public/assets/icons/billing/Discover.svg`),
);

const IconBilling = dynamic(
  () => import(`@public/assets/icons/common/Billing.svg`),
);

export const getPaymentMethodIcon = (name: string) => {
  switch (name) {
    case 'amex':
      return IconAmericanExpress;
    case 'mastercard':
      return IconMasterCard;
    case 'visa':
      return IconVisa;
    case 'discover':
      return IconDiscover;
    default:
      return IconBilling;
  }
};
