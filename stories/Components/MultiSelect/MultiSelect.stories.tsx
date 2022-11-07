import { MultiSelect } from '@shared/components';
import { withRHF } from '@shared/index';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  decorators: [withRHF()],
};

const Template: ComponentStory<typeof MultiSelect> = (args) => (
  <MultiSelect {...args} />
);

export const Default = Template.bind({});

Default.args = {
  name: 'select',
  placeholder: 'Pick something',
  options: [
    { label: 'option1', value: 'option1' },
    { label: 'option2', value: 'option' },
  ],
};
