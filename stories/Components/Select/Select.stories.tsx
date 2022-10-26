import { Select } from '@shared/components';
import { withRHF } from '@shared/index';
import { ComponentStory } from '@storybook/react';
import { MouseEventHandler, useState } from 'react';

export default {
  title: 'Components/Select',
  component: Select,
  decorators: [withRHF()],
};

const Template: ComponentStory<typeof Select> = (args) => {
  const options = [
    { label: 'option1', value: 'option1' },
    { label: 'option2', value: 'option' },
  ];
  return <Select {...args} options={options} />;
};

export const Default = Template.bind({});

Default.args = {
  name: 'select',
  inputStyle: 'default',
  inputSize: 'medium',
};

export const Outline = Template.bind({});

Outline.args = {
  name: 'select',
  inputStyle: 'outline',
  inputSize: 'medium',
};
