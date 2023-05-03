import { mapCardToDetails } from '@modules/organization/utils/mapCardToDetails';
import { Button, DetailsTable } from '@shared/index';
import { Card } from 'chargebee-typescript/lib/resources/payment_source';
import { styles } from './CardPreview.styles';

export type CardPreviewProps = {
  card: Card;
};

export const CardPreview = ({ card }: CardPreviewProps) => {
  const handleUpdate = () => {
    console.log('Handle update');
  };

  const handleRemove = () => {
    console.log('Handle update');
  };

  return (
    <div css={styles.wrapper}>
      <DetailsTable bodyElements={mapCardToDetails(card!)} />
      <div css={styles.buttons}>
        <Button onClick={handleUpdate} size="small" style="secondary">
          Update
        </Button>
        <Button onClick={handleRemove} size="small" style="outline">
          Remove
        </Button>
      </div>
    </div>
  );
};
