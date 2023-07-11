import { PasswordToggle } from '@modules/auth';
import { Input } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Input',
  component: Input,
};

const Template: ComponentStory<typeof Input> = (args) => {
  return (
    <div style={{ maxWidth: '300px' }}>
      <Input {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  name: 'input',
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  name: 'input',
  leftIcon: (
    <>
      <PasswordToggle activeType="password" onClick={() => console.log()} />
    </>
  ),
};
