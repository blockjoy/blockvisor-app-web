import { BackButton } from '@shared/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/BackButton',
  component: BackButton,
};

const Template: ComponentStory<typeof BackButton> = (args) => (
  <BackButton {...args} />
);

export const Default = Template.bind({});

Default.args = {
  style: 'primary',
  disabled: false,
};
