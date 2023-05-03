import { DetailsDataRow } from '@shared/index';
import { Card } from 'chargebee-typescript/lib/resources/payment_source';
import { capitalize } from 'utils/capitalize';

export const mapCardToDetails = (card: Card) => {
  const details: DetailsDataRow[] = [
    {
      label: 'TYPE',

      data: (
        <>
          <b>{capitalize(card?.brand)}</b>
        </>
      ),
    },
    {
      label: 'Number',

      data: (
        <>
          <b>{card?.masked_number}</b>
        </>
      ),
    },
    {
      label: 'Expiry',

      data: (
        <>
          <b>
            {card?.expiry_month}/{card?.expiry_year}
          </b>
        </>
      ),
    },
  ];

  return details;
};
