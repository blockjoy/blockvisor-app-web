import { mapOrganizationsToRows } from '@modules/organization/utils/mapOrganizationsToRows';
import { Table } from '@shared/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Table',
  component: Table,
};

const mockdata = [
  {
    id: '9e127189-edad-44b2-9d0d-0a5e4be81b48',
    name: 'Organization 1',
    personal: true,
    memberCount: 1,
    members: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    nodeCount: 0,
    hostCount: 0,
  },
  {
    id: '28ce6cf1-3caf-49a2-8928-bcd3777a2b3b',
    name: 'Organization 2',
    personal: false,
    memberCount: 1,
    members: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    nodeCount: 0,
    hostCount: 0,
  },
  {
    id: '793be634-bf9e-495d-891f-b3185696030e',
    name: 'Organization 3',
    personal: false,
    memberCount: 1,
    members: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    nodeCount: 1,
    hostCount: 0,
  },
];

const headers: TableHeader[] = [
  {
    name: 'Org. Name',
    key: '1',
  },
  {
    name: 'Members',
    key: '2',
  },
  {
    name: 'Type',
    key: '3',
  },
];

const Template: ComponentStory<typeof Table> = (args) => {
  const rows = mapOrganizationsToRows(mockdata, '');

  return <Table {...args} isLoading={'loading'} />;
};

export const Default = Template.bind({});

Default.args = {
  rows: [],
  headers: headers,
};
