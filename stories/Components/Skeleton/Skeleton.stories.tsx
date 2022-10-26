import { Skeleton } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
};

const Template: ComponentStory<typeof Skeleton> = (args) => {
  return <Skeleton {...args} />;
};

export const Default = Template.bind({});

Default.args = { width: '100px' };
