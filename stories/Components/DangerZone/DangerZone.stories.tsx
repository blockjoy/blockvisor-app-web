import { DangerZone } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/DangerZone',
  component: DangerZone,
};

const Template: ComponentStory<typeof DangerZone> = (args) => {
  return (
    <div style={{ maxWidth: '500px' }}>
      <DangerZone {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  elementName: 'Host',
  elementNameToCompare: 'Host',
};
