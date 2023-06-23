import { Button, Input } from '@shared/components';
import { checkIfValidEmail, isValidEmail } from '@shared/utils/validation';
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  KeyboardEventHandler,
  useState,
} from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './OrganizationInvite.styles';

type Props = {
  isInviting: boolean;
  onInviteClicked: (name: string) => void;
  onCancelClicked: VoidFunction;
};

type InviteForm = {
  email: string;
};

export const OrganizationInvite: FC<Props> = ({
  isInviting,
  onInviteClicked,
  onCancelClicked,
}) => {
  const form = useForm<InviteForm>();

  const { isValid } = form.formState;

  const onSubmit: SubmitHandler<InviteForm> = async ({ email }) => {
    onInviteClicked(email);
  };

  return (
    <div css={spacing.bottom.large}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} css={styles.wrapper}>
          <Input
            placeholder="New member email address"
            name="email"
            type="text"
            inputSize="medium"
            validationOptions={{
              required: 'An email address is required',
              pattern: {
                value: isValidEmail(),
                message: 'Email format is not correct',
              },
            }}
            shouldAutoFocus
          />
          <div css={styles.buttons}>
            <Button
              disabled={!isValid}
              loading={isInviting}
              style="secondary"
              size="small"
              type="submit"
            >
              Add
            </Button>
            <Button onClick={onCancelClicked} style="outline" size="small">
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
