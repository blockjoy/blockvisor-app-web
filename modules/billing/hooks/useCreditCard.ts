import { useRecoilState } from 'recoil';
import { CREDIT_CARD } from '../mocks/creditCard';
import { billingAtoms } from '@modules/billing';

export const useCreditCard = (): ICreditCardHook => {
  const [creditCard, setCreditCard] = useRecoilState(billingAtoms.creditCard);
  const [creditCardLoadingState, setCreditCardLoadingState] = useRecoilState(
    billingAtoms.creditCardLoadingState,
  );

  const getCard = async (customerId: string) => {
    setCreditCardLoadingState('initializing');

    try {
      const response = await fetch('/api/billing/payments/sources/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: customerId }),
      });

      const data = await response.json();

      setCreditCard(data[0].card);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    }

    setCreditCardLoadingState('finished');
  };

  const addCard = async ({
    cardHolder,
    cardNumber,
    expMonth,
    expYear,
    cvc,
  }: CreditCardParams) => {
    await new Promise((r) => setTimeout(r, 300));

    console.log(
      'CREDIT CARD [addCard]',
      cardHolder,
      cardNumber,
      expMonth,
      expYear,
      cvc,
    );
    setCreditCard({
      ...CREDIT_CARD,
      name: cardHolder,
      last4: cardNumber.slice(-4),
      exp_month: expMonth,
      exp_year: expYear,
    });
  };
  const updateCard = () => {};

  return {
    creditCard,
    creditCardLoadingState,

    getCard,
    addCard,
    updateCard,
  };
};
