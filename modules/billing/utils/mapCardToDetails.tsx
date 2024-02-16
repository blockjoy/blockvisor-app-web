import { Card } from 'chargebee-typescript/lib/resources/payment_source';
import { css } from '@emotion/react';
import { capitalize } from 'utils/capitalize';
import { PaymentIcon } from '@modules/billing';

const styles = {
  info: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 8px;
  `,
};

export const mapCardToDetails = (card: Card) => {
  const details: any[] = [
    {
      label: 'Type',
      data: (
        <div css={styles.info}>
          <PaymentIcon brand={card?.brand} />
          <p>{capitalize(card?.brand)}</p>
        </div>
      ),
    },
    {
      label: 'Number',
      data: <p>{card?.masked_number}</p>,
    },
    {
      label: 'Expiration Date',
      data: (
        <p>
          {card?.expiry_month?.toString().padStart(2, '0')}/{card?.expiry_year}
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
