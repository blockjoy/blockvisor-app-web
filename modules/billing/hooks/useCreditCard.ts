import { useRecoilState } from 'recoil';
import { CREDIT_CARD } from '../mocks/creditCard';
import { billingAtoms } from '../store/billingAtoms';

export const useCreditCard = (): ICreditCardHook => {
  const [creditCard, setCreditCard] = useRecoilState(billingAtoms.creditCard);
  const [creditCardLoadingState, setCreditCardLoadingState] = useRecoilState(
    billingAtoms.creditCardLoadingState,
  );

  const getCard = (id: string) => {
    setCreditCardLoadingState('initializing');

    const card: ICreditCard = CREDIT_CARD;

    setCreditCard(card);

    setCreditCardLoadingState('finished');
  };

  const addCard = async ({
    cardHolder,
    cardNumber,
    expMonth,
    expYear,
    cvc,
  }: CreditCardParams) => {
    await new Promise((r) => setTimeout(r, 600));

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
