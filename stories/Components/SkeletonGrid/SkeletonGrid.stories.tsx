import { Skeleton, SkeletonGrid } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/SkeletonGrid',
  component: SkeletonGrid,
};

const Template: ComponentStory<typeof SkeletonGrid> = (args) => {
  return (
    <SkeletonGrid {...args}>
      <Skeleton width="50px" />
      <Skeleton width="100px" />
      <Skeleton width="150px" />
    </SkeletonGrid>
  );
};

export const Default = Template.bind({});

Default.args = { padding: '5px 0 20px' };
