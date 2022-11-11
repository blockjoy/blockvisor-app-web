import { NodeEarnings } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/NodeEarnings',
  component: NodeEarnings,
};

const Template: ComponentStory<typeof NodeEarnings> = (args) => (
  <NodeEarnings />
);

export const Default = Template.bind({});

Default.args = {};
