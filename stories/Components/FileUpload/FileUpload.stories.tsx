import { FileUpload } from '@shared/components';
import { ComponentStory } from '@storybook/react';
import { MouseEventHandler, useState } from 'react';

export default {
  title: 'Components/FileUpload',
  component: FileUpload,
};

const Template: ComponentStory<typeof FileUpload> = (args) => {
  const [files, setFiles] = useState<File[]>([]);
  const handleChange = (files: File[]) => {
    setFiles((prev) => [...prev, ...files]);
  };

  const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles([]);
  };
  return (
    <FileUpload
      {...args}
      files={files}
      onChange={handleChange}
      remove={handleRemove}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  placeholder: 'Upload something',
};
