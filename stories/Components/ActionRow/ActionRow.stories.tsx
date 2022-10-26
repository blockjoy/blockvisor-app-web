import { ActionRow, Button } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/ActionRow',
  component: ActionRow,
};

const Template: ComponentStory<typeof ActionRow> = (args) => {
  return (
    <div style={{ maxWidth: '500px' }}>
      <ActionRow {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  title: 'Lorem title',
  description: 'Lorem ipsum ipsum lorem',
  action: (
    <Button style="secondary" size="small">
      Click
    </Button>
  ),
};
