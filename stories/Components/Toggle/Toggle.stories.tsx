import { Toggle } from '@shared/components';
import { ComponentStory } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Components/Toggle',
  component: Toggle,
};

const Template: ComponentStory<typeof Toggle> = (args) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
  };
  return (
    <div style={{ maxWidth: '500px' }}>
      <Toggle {...args} active={active} onClick={handleClick} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {};
