import { TagsField } from '@shared/components';
import { withRHF } from '@shared/index';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/TagsField',
  component: TagsField,
  decorators: [withRHF()],
};

const Template: ComponentStory<typeof TagsField> = (args) => (
  <TagsField {...args} />
);

export const Base = Template.bind({});

Base.args = {
  name: 'field',
  value: 'value1,value2,value3',
  inputSize: 'medium',
  disabled: false,
  label: 'test',
};
