import { css } from '@emotion/react';
import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { Badge } from '@shared/components';
import { typo } from 'styles/utils.typography.styles';
import { ITheme } from 'types/theme';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import {
  CreditCardTypes,
  PaymentIcon,
  PaymentMethodActions,
} from '@modules/billing';

const styles = {
  expiry: (theme: ITheme) => css`
    color: ${theme.colorLabel};
  `,
};

export const mapPaymentMethodsToRows = (
  paymentMethods: PaymentSource[],
  handleAction: (
    action: PaymentMethodAction,
    paymentMethod: PaymentSource,
  ) => void,
  primaryPaymentMethodId?: string,
  loadingItem?: string,
) => {
  const handleDelete = (paymentMethod: PaymentSource) => {
    handleAction('delete', paymentMethod);
  };

  const handleDefault = (paymentMethod: PaymentSource) => {
    handleAction('update', paymentMethod);
  };

  const headers: TableHeader[] = [
    {
      name: '',
      key: '1',
      width: '30px',
      minWidth: '30px',
      maxWidth: '40px',
    },
    {
      name: 'Name',
      key: '2',
      width: '600px',
    },
    {
      name: 'Billing Address',
      key: '3',
      width: '400px',
    },
    {
      name: '',
      key: '4',
      width: '200px',
    },
  ];

  const rows: Row[] =
    paymentMethods?.map((paymentMethod: PaymentSource) => {
      return {
        key: paymentMethod?.id!,
        cells: [
          {
            key: '1',
            component: <PaymentIcon brand={paymentMethod?.card?.brand!} />,
          },
          {
            key: '2',
            component: (
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
                    {paymentMethod?.card?.expiry_month
                      ?.toString()
                      .padStart(2, '0')}
                    /{paymentMethod?.card?.expiry_year}
                  </p>
                  {primaryPaymentMethodId === paymentMethod.id && (
                    <Badge color="primary" style="outline">
                      Primary
                    </Badge>
                  )}
                </div>
              </div>
            ),
          },
          {
            key: '3',
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
            key: '4',
            component: (
              <div css={spacing.left.medium}>
                <PaymentMethodActions
                  handleDelete={() => handleDelete(paymentMethod)}
                  handleDefault={() => handleDefault(paymentMethod)}
                  isPrimary={primaryPaymentMethodId === paymentMethod.id}
                  isLoading={loadingItem === paymentMethod.id}
                />
              </div>
            ),
          },
        ],
      };
    }) ?? [];

  return {
    rows,
    headers,
  };
};
