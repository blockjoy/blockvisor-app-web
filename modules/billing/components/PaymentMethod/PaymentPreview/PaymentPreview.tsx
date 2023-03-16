export type PaymentPreviewProps = {
  card: ICreditCard | null;
};

export const PaymentPreview = ({ card }: PaymentPreviewProps) => {
  return (
    <div>
      <p>
        <b>{card?.brand}</b> ending in <b>{card?.last4}</b>
      </p>
    </div>
  );
};
