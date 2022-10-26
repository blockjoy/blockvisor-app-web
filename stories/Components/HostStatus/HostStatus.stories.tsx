import { HostStatus } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/HostStatus',
  component: HostStatus,
};

const Template: ComponentStory<typeof HostStatus> = (args) => {
  return <HostStatus {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  status: 1,
};
