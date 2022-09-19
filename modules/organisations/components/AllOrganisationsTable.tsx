import { Table } from '@modules/app/components/shared';
import { Button, ButtonWithDropdown, DropdownItem } from '@shared/components';
import { FC, useEffect } from 'react';
import { useOrganisations } from '../hooks/useOrganisations';
import PersonIcon from '@public/assets/icons/person-12.svg';
import EditIcon from '@public/assets/icons/pencil-12.svg';
import RemoveIcon from '@public/assets/icons/close-12.svg';
import { flex } from 'styles/utils.flex.styles';
import { divider, spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';

const headers: TableHeader[] = [
  {
    name: 'Org. Name',
    key: '1',
  },
  {
    name: 'Members',
    key: '2',
  },
];

const mapOrganisationsToRows = (organisations?: Organisation[]) => {
  return organisations?.map((org, idx) => ({
    key: org.id?.value ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{org.name}</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{org.memberCount}</p>
          </>
        ),
      },
      {
        key: '3',
        component: (
          <div css={[flex.display.flex]}>
            <Button style="outline" size="small">
              <PersonIcon />
              Members
            </Button>
            <div css={[spacing.left.small]}>
              <ButtonWithDropdown>
                <ul css={[reset.list]}>
                  <li>
                    <DropdownItem size="large">
                      <EditIcon />
                      Edit
                    </DropdownItem>
                  </li>
                  <li css={[divider]}>
                    <DropdownItem size="large">
                      <RemoveIcon />
                      Remove
                    </DropdownItem>
                  </li>
                </ul>
              </ButtonWithDropdown>
            </div>
          </div>
        ),
      },
    ],
  }));
};

export const AllOrganisationsTable: FC = () => {
  const { getOrganizations, organisations, loadingOrganizations } =
    useOrganisations();

  useEffect(() => {
    getOrganizations();
  }, []);

  const rows = mapOrganisationsToRows(organisations);

  return (
    <Table isLoading={loadingOrganizations} headers={headers} rows={rows} />
  );
};
