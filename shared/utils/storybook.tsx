import { FC, PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

const StorybookFormProvider = ({ children }: PropsWithChildren) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
};

export const withRHF =
  () =>
  (Story: FC): StoryFnReactReturnType =>
    (
      <StorybookFormProvider>
        <Story />
      </StorybookFormProvider>
    );
