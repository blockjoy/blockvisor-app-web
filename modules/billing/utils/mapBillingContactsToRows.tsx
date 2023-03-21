import { Button } from '@shared/components';
import IconClose from '@public/assets/icons/close-12.svg';

export const mapBillingContactsToRows = (
  billingContacts: IBillingContact[],
  handleRemove: (id: string) => void,
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

  const rows: any = billingContacts?.map((contact: any, idx: number) => ({
    key: contact.id ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{contact.name}</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{contact.email}</p>
          </>
        ),
      },

      {
        key: '3',
        component: (
          <>
            <Button
              type="button"
              tooltip="Remove"
              style="icon"
              size="medium"
              onClick={() => handleRemove(contact)}
            >
              <IconClose />
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
