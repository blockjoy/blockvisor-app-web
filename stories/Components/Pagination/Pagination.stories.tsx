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
  pageTotal: 10,
  pagesToDisplay: 5,
};

Default.parameters = {
  nextRouter: {
    path: '/',
    query: {
      page: 1,
    },
  },
};
