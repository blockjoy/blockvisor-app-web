import { Button, ConfirmDialog, DetailsTable } from '@shared/index';
import { Card } from 'chargebee-typescript/lib/resources/payment_source';
import { styles } from './CardPreview.styles';
import { usePaymentMethods } from '@modules/billing/hooks/usePaymentMethods';
import { useState } from 'react';
import { mapCardToDetails } from '@modules/billing/utils/mapCardToDetails';

export type CardPreviewProps = {
  id: string;
  card: Card;
  handleClick: VoidFunction;
};

export const CardPreview = ({ id, card, handleClick }: CardPreviewProps) => {
  const [activeView, setActiveView] =
    useState<string | 'list' | 'dialog'>('list');
  const { deletePaymentMethod } = usePaymentMethods();

  // const handleUpdate = async () => {
  //   handleClick();
  // };

  const handleConfirm = () => deletePaymentMethod(id);

  const handleRemove = () => setActiveView('dialog');
  const onHide = () => setActiveView('list');

  return (
    <>
      <div css={styles.wrapper}>
        <DetailsTable bodyElements={mapCardToDetails(card!)} />
        <div css={styles.buttons}>
          {/* <Button onClick={handleUpdate} size="small" style="secondary">
            Update
          </Button> */}
          <Button onClick={handleRemove} size="small" style="outline">
            Remove
          </Button>
        </div>
      </div>

      {activeView === 'dialog' && (
        <ConfirmDialog
          title={'Remove Credit Card'}
          message={`You are removing Credit Card ending in ****${card.last4}! Are you sure?`}
          handleConfirm={handleConfirm}
          onHide={onHide}
        />
      )}
    </>
  );
};
