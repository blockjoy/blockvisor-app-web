import { Pill } from '@shared/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Pill',
  component: Pill,
};

const Template: ComponentStory<typeof Pill> = (args) => <Pill {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'test',
};
