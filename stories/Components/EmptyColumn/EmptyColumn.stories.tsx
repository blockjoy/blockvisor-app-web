import { EmptyColumn } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/EmptyColumn',
  component: EmptyColumn,
};

const Template: ComponentStory<typeof EmptyColumn> = (args) => {
  return (
    <div style={{ maxWidth: '500px' }}>
      <EmptyColumn {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  title: 'No Nodes.',
  description: 'Add your nodes and hosts to get started with BlockVisor.',
};
