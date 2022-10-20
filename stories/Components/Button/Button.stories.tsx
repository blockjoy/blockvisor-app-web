import { Button } from '@shared/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
);

export const Primary = Template.bind({});

Primary.args = {
  children: 'Click',
  style: 'primary',
  disabled: false,
};

export const Secondary = Template.bind({});

Secondary.args = {
  children: 'Click',
  style: 'secondary',
  disabled: false,
};

export const Ghost = Template.bind({});

Ghost.args = {
  children: 'Click',
  style: 'ghost',
  disabled: false,
};

export const Outline = Template.bind({});

Outline.args = {
  children: 'Click',
  style: 'outline',
  disabled: false,
};

export const Warning = Template.bind({});

Warning.args = {
  children: 'Click',
  style: 'warning',
  disabled: false,
};
