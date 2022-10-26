import { LoadingSpinner } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
};

const Template: ComponentStory<typeof LoadingSpinner> = (args) => {
  return <LoadingSpinner {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  size: 'large',
};
