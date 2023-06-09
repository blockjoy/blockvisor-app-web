import { Card } from 'chargebee-typescript/lib/resources/payment_source';
import { capitalize } from 'utils/capitalize';

export const mapCardToDetails = (card: Card) => {
  const details: any[] = [
    {
      label: 'TYPE',
      data: <p>{capitalize(card?.brand)}</p>,
    },
    {
      label: 'Number',
      data: <p>{card?.masked_number}</p>,
    },
    {
      label: 'Expiry',
      data: (
        <p>
          {card?.expiry_month}/{card?.expiry_year}
        </p>
      ),
    },
    {
      label: 'Billing Info',
      data: (
        <>
          {card?.billing_addr1 ? (
            <p>
              {card?.billing_addr1}
              <br />
              {card?.billing_zip} {card?.billing_city}, {card?.billing_country}
            </p>
          ) : (
            '-'
          )}
        </>
      ),
    },
  ];

  return details;
};
