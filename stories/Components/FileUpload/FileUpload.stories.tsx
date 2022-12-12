import { FileUpload } from '@shared/components';
import { withRHF } from '@shared/index';
import { ComponentStory } from '@storybook/react';
import { MouseEventHandler, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default {
  title: 'Components/FileUpload',
  component: FileUpload,
  decorators: [withRHF()],
};

type StorybookFileUpload = {
  validatorKeys: File[];
};
const Template: ComponentStory<typeof FileUpload> = (args) => {
  const form = useForm<StorybookFileUpload>({
    defaultValues: {
      validatorKeys: [],
    },
  });
  const { setValue } = form;

  return (
    <Controller
      name="validatorKeys"
      render={({ field: { onChange } }) => {
        return <FileUpload multiple={true} {...args} onChange={onChange} />;
      }}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  placeholder: 'Upload something',
};
