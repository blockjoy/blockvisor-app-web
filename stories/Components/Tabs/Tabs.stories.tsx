import { Tabs } from '@shared/components';
import { useTabs } from '@shared/index';
import { ComponentStory } from '@storybook/react';
import { useMemo } from 'react';

export default {
  title: 'Components/Tabs',
  component: Tabs,
};

const Template: ComponentStory<typeof Tabs> = (args) => {
  const items = useMemo(
    () => [
      {
        label: 'Personal Information',
        value: '1',
        component: <p>First tab</p>,
      },
      {
        label: 'Account',
        value: '2',
        component: <p>Second</p>,
      },
    ],
    [],
  );

  const { activeTab, setActiveTab } = useTabs(2);

  const handleClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };
  return (
    <div style={{ maxWidth: '500px' }}>
      <Tabs
        {...args}
        tabItems={items}
        activeTab={activeTab}
        onTabClick={handleClick}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {};
