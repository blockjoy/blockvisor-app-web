import { Pagination } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Pagination',
  component: Pagination,
};

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});

Default.args = {
  numberOfItems: 10,
  itemsPerPage: 5,
};

Default.parameters = {
  nextRouter: {
    path: '/',
    query: {
      page: 1,
    },
  },
};
