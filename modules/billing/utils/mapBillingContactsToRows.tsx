import { Button, SvgIcon } from '@shared/components';
import IconClose from '@public/assets/icons/common/Close.svg';

export const mapBillingContactsToRows = (
  billingContacts: any[],
  handleRemove: (contact: any) => void,
  subscriptionStatus: string | undefined,
) => {
  const headers: TableHeader[] = [
    {
      name: 'Name',
      key: '1',
      width: '200px',
    },
    {
      name: 'Email',
      key: '2',
      width: '300px',
    },
    {
      name: '',
      key: '3',
      width: '24px',
    },
  ];

  const rows: Row[] =
    billingContacts?.map((contact: any, idx: number) => ({
      key: contact.id ?? `${idx}`,
      cells: [
        {
          key: '1',
          component: <p>{contact.first_name}</p>,
        },
        {
          key: '2',
          component: <p>{contact.email}</p>,
        },
        {
          key: '3',
          component: (
            <Button
              type="button"
              tooltip="Remove"
              style="icon"
              size="medium"
              onClick={() => handleRemove(contact)}
            >
              <SvgIcon size="20px">
                <IconClose />
              </SvgIcon>
            </Button>
          ),
        },
      ].filter((cell) => cell.key !== '3' || subscriptionStatus === 'active'),
    })) ?? [];

  return {
    rows,
    headers,
  };
};
