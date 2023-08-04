import { PaymentSource } from 'chargebee-typescript/lib/resources';
import { ActionsDropdown } from '@shared/components';
import IconDelete from '@public/assets/icons/common/Trash.svg';
import IconBilling from '@public/assets/icons/common/Billing.svg';

type PaymentMethodActionsProps = {
  paymentMethod: PaymentSource;
  handleRemove: (paymentMethod: PaymentSource) => void;
  handleDefault: (paymentSourceId: string) => void;
  isPrimary: boolean;
};

export const PaymentMethodActions = ({
  paymentMethod,
  handleRemove,
  handleDefault,
  isPrimary,
}: PaymentMethodActionsProps) => {
  let actions = [
    {
      title: 'Delete',
      icon: <IconDelete />,
      method: () => handleRemove(paymentMethod),
    },
  ];

  if (!isPrimary) {
    actions = [
      {
        title: 'Set as Default',
        icon: <IconBilling />,
        method: () => handleDefault(paymentMethod.id),
      },
      ...actions,
    ];
  }

  return <ActionsDropdown items={actions} align="right" />;
};
