import { Logo } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Logo',
  component: Logo,
};

const Template: ComponentStory<typeof Logo> = (args) => {
  return (
    <div style={{ maxWidth: '500px' }}>
      <Logo {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {};
