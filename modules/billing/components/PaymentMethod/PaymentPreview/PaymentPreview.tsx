import { DetailsView } from '@shared/index';
import { CardPreview } from './CardPreview/CardPreview';
import { Card } from 'chargebee-typescript/lib/resources';

export type PaymentPreviewProps = {
  items: Card[];
};

export const PaymentPreview = ({ items }: PaymentPreviewProps) => {
  return (
    <>
      <DetailsView headline="Payment methods">
        {items.map((item: any) => {
          if (item.card)
            return <CardPreview key={item.card.id} card={item.card} />;
          // TODO: if other payment methods are added, add previews
          return null;
        })}
      </DetailsView>
    </>
  );
};
