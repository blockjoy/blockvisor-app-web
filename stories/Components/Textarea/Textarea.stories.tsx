import { Textarea } from '@shared/components';
import { withRHF } from '@shared/index';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  decorators: [withRHF()],
};

const Template: ComponentStory<typeof Textarea> = (args) => {
  return (
    <div style={{ maxWidth: '300px' }}>
      <Textarea {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  name: 'textarea',
};
