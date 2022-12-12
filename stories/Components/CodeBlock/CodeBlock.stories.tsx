import { CodeBlock } from '@shared/components';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CodeBlock',
  component: CodeBlock,
};

const Template: ComponentStory<typeof CodeBlock> = (args) => {
  return <CodeBlock {...args} />;
};

export const Bash = Template.bind({});

Bash.args = {
  language: 'bash',
  code: 'curl http://bvs.sh/ | bash -s -- 1234567',
};
