import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import { FC, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  children?: ReactNode;
};
const StorybookFormProvider = ({ children }: Props) => {
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
