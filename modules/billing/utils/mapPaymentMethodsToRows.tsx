import { Button, formatDate, SvgIcon } from '@shared/index';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { typo } from 'styles/utils.typography.styles';
import { capitalize } from 'utils/capitalize';
import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { flex } from 'styles/utils.flex.styles';
import IconClose from '@public/assets/icons/close-12.svg';

const styles = {
  expiry: (theme: ITheme) => css`
    color: ${theme.colorLabel};
  `,
};

export const mapPaymentMethodsToRows = (
  paymentMethods: PaymentSource[],
  handleRemove: (paymentMethod: any) => void,
) => {
  const headers: TableHeader[] = [
    {
      name: 'Name',
      key: '1',
      width: '150px',
    },
    {
      name: 'Added',
      key: '2',
      width: '100px',
    },
    {
      name: 'Status',
      key: '3',
      width: '100px',
    },
    {
      name: '',
      key: '4',
      width: '50px',
      minWidth: '50px',
      maxWidth: '50px',
      textAlign: 'right',
    },
  ];

  const rows: Row[] = paymentMethods!.map((paymentMethod: PaymentSource) => ({
    key: paymentMethod?.id!,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p css={[flex.display.flex, flex.direction.column]}>
              <span css={typo.ellipsis} style={{ maxWidth: '90%' }}>
                {`${capitalize(paymentMethod?.card?.brand!)} ****${
                  paymentMethod.card?.last4
                }`}
              </span>

              <span css={styles.expiry}>
                {' '}
                {paymentMethod?.card?.expiry_month}/
                {paymentMethod?.card?.expiry_year}
              </span>
            </p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{formatDate(paymentMethod.created_at)}</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <>
            <p>{capitalize(paymentMethod.status)}</p>
          </>
        ),
      },
      {
        key: '4',
        component: (
          <>
            <Button
              type="button"
              tooltip="Cancel"
              style="icon"
              size="medium"
              onClick={() => handleRemove(paymentMethod)}
            >
              <SvgIcon size="20px">
                <IconClose />
              </SvgIcon>
            </Button>
          </>
        ),
      },
    ],
  }));

  return {
    rows,
    headers,
  };
};
