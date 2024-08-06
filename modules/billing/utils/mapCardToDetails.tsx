import { css } from '@emotion/react';
import { capitalize } from 'utils/capitalize';
import { PaymentIcon } from '@modules/billing';
import { Card } from '@modules/grpc/library/blockjoy/v1/org';

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
      data: <p>{card?.last4}</p>,
    },
    {
      label: 'Expiration date',
      data: (
        <p>
          {card?.expMonth?.toString().padStart(2, '0')}/{card?.expYear}
        </p>
      ),
    },
    {
      label: 'Billing Address',
      data: (
        <>
          {/* {card?. ? (
            <p>
              {card?.billing_addr1}
              <br />
              {card?.billing_zip} {card?.billing_city}, {card?.billing_country}
            </p>
          ) : (
            '-'
          )} */}
        </>
      ),
    },
  ];

  return details;
};
