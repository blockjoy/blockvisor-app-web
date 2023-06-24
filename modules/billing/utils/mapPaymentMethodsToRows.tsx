import { Badge, Button, formatters, SvgIcon } from '@shared/index';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { typo } from 'styles/utils.typography.styles';
import { capitalize } from 'utils/capitalize';
import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { flex } from 'styles/utils.flex.styles';
import IconClose from '@public/assets/icons/common/Close.svg';
import { spacing } from 'styles/utils.spacing.styles';
import { CreditCardTypes } from '../constants/common';

const styles = {
  expiry: (theme: ITheme) => css`
    color: ${theme.colorLabel};
  `,
};

export const mapPaymentMethodsToRows = (
  paymentMethods: PaymentSource[],
  handleRemove: (paymentMethod: PaymentSource) => void,
  primaryPaymentMethodId?: string,
) => {
  const headers: TableHeader[] = [
    {
      name: 'Name',
      key: '1',
      width: '200px',
    },
    {
      name: 'Billing Info',
      key: '2',
      width: '200px',
    },
    {
      name: 'Added',
      key: '3',
      width: '100px',
    },
    {
      name: 'Status',
      key: '4',
      width: '70px',
    },
    {
      name: '',
      key: '5',
      width: '50px',
      minWidth: '50px',
      maxWidth: '50px',
      textAlign: 'right',
    },
  ];

  const rows: Row[] =
    paymentMethods?.map((paymentMethod: PaymentSource) => ({
      key: paymentMethod?.id!,
      cells: [
        {
          key: '1',
          component: (
            <>
              <div css={[flex.display.flex, flex.direction.column]}>
                <div>
                  <p css={typo.ellipsis} style={{ maxWidth: '90%' }}>
                    {`${CreditCardTypes[paymentMethod?.card?.brand!]} ****${
                      paymentMethod.card?.last4
                    }`}
                  </p>
                </div>

                <div
                  css={[
                    flex.display.flex,
                    flex.direction.row,
                    flex.align.center,
                    spacing.top.micro,
                  ]}
                >
                  <p css={[styles.expiry, spacing.right.small]}>
                    {paymentMethod?.card?.expiry_month}/
                    {paymentMethod?.card?.expiry_year}
                  </p>
                  {primaryPaymentMethodId === paymentMethod.id && (
                    <Badge color="primary" style="outline">
                      Primary
                    </Badge>
                  )}
                </div>
              </div>
            </>
          ),
        },
        {
          key: '2',
          component: (
            <>
              {paymentMethod.card?.billing_addr1 ? (
                <p>
                  {paymentMethod.card?.billing_addr1}
                  <br />
                  {paymentMethod.card?.billing_zip}{' '}
                  {paymentMethod.card?.billing_city},{' '}
                  {paymentMethod.card?.billing_country}
                </p>
              ) : (
                '-'
              )}
            </>
          ),
        },
        {
          key: '3',
          component: (
            <>
              <p>{formatters.formatDate(paymentMethod.created_at)}</p>
            </>
          ),
        },
        {
          key: '4',
          component: (
            <>
              <p>{capitalize(paymentMethod.status)}</p>
            </>
          ),
        },
        {
          key: '5',
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
    })) ?? [];

  return {
    rows,
    headers,
  };
};
