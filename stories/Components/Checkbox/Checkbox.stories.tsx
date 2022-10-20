import { Checkbox } from '@shared/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [isChecked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked((prev) => !prev);
  };
  return <Checkbox checked={isChecked} {...args} onChange={handleClick} />;
};

export const Default = Template.bind({});

Default.args = {
  children: 'test',
};
