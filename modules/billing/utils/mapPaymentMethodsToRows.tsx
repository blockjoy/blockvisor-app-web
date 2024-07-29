import { css } from '@emotion/react';
import { PaymentMethod } from '@modules/grpc/library/blockjoy/v1/org';
import { typo } from 'styles/utils.typography.styles';
import { ITheme } from 'types/theme';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { PaymentIcon, CreditCardBrand } from '@modules/billing';

const styles = {
  expiry: (theme: ITheme) => css`
    color: ${theme.colorLabel};
  `,
};

export const mapPaymentMethodsToRows = (
  paymentMethods: PaymentMethod[],
  // handleAction: (
  //   action: PaymentMethodAction,
  //   paymentMethod: PaymentMethod,
  // ) => void,
  // primaryPaymentMethodId?: string,
  // loadingItem?: string,
  // canInitCard?: boolean,
) => {
  // const handleDelete = (paymentMethod: PaymentMethod) => {
  //   handleAction('delete', paymentMethod);
  // };

  // const handleDefault = (paymentMethod: PaymentMethod) => {
  //   handleAction('update', paymentMethod);
  // };

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
    // {
    //   name: '',
    //   key: '4',
    //   width: '200px',
    // },
  ];

  const rows: Row[] =
    paymentMethods?.map((paymentMethod: PaymentMethod) => {
      return {
        key: paymentMethod?.card?.last4!,
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
                    {`${CreditCardBrand[paymentMethod?.card?.brand!]} ****${
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
                    {paymentMethod?.card?.expMonth?.toString().padStart(2, '0')}
                    /{paymentMethod?.card?.expYear}
                  </p>
                  {/* {!!primaryPaymentMethodId &&
                    primaryPaymentMethodId === paymentMethod.id && (
                      <Badge color="primary" style="outline">
                        Primary
                      </Badge>
                    )} */}
                </div>
              </div>
            ),
          },
          // {
          //   key: '4',
          //   component: canInitCard && (
          //     <div css={spacing.left.medium}>
          //       <PaymentMethodActions
          //         handleDelete={() => handleDelete(paymentMethod)}
          //         handleDefault={() => handleDefault(paymentMethod)}
          //         isPrimary={
          //           !!primaryPaymentMethodId &&
          //           primaryPaymentMethodId === paymentMethod.id
          //         }
          //         isLoading={loadingItem === paymentMethod.id}
          //       />
          //     </div>
          //   ),
          // },
        ],
      };
    }) ?? [];

  return {
    rows,
    headers,
  };
};
