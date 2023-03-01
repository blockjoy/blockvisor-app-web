import { handleCreditCardInfo } from '@modules/billing';

export type PaymentPreviewProps = {
  cardNumber: string;
};

export const PaymentPreview = ({ cardNumber }: PaymentPreviewProps) => {
  const { cardType, cardEnding } = handleCreditCardInfo(cardNumber);
  return (
    <div>
      <p>
        <b>{cardType}</b> ending in <b>{cardEnding}</b>
      </p>
    </div>
  );
};
