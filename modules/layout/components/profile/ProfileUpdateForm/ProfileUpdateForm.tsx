import { layoutState } from '@modules/layout/store/layoutAtoms';
import { Button, Input } from '@shared/components';
import { delay } from '@shared/utils/delay';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { display } from 'styles/utils.display.styles';
import { reset } from 'styles/utils.reset.styles';
import { spacing } from 'styles/utils.spacing.styles';

type ProfileUpdate = {
  firstName: string;
  lastName: string;
  address: string;
};

export function ProfileUpdate() {
  const form = useForm<ProfileUpdate>();
  const setLayout = useSetRecoilState(layoutState);
  const [loading, setIsLoading] = useState(false);

  const onSubmit = form.handleSubmit(
    async ({ firstName, lastName, address }) => {
      setIsLoading(true);

      console.log({ firstName, lastName, address });
      await delay(1000);

      toast.success('Profile updated');
      setIsLoading(false);
      setLayout(undefined);
    },
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <ul css={[reset.list]}>
          <li css={[spacing.bottom.medium]}>
            <Input
              labelStyles={[display.visuallyHidden]}
              disabled={loading}
              name="firstName"
              placeholder="first name"
              type="text"
            />
          </li>
          <li css={[spacing.bottom.medium]}>
            <Input
              labelStyles={[display.visuallyHidden]}
              disabled={loading}
              name="lastName"
              placeholder="last name"
              type="text"
            />
          </li>
          <li css={[spacing.bottom.medium]}>
            <Input
              labelStyles={[display.visuallyHidden]}
              disabled={loading}
              name="address"
              placeholder="address"
              type="text"
            />
          </li>
        </ul>
        <Button
          loading={loading}
          disabled={loading}
          size="medium"
          display="block"
          style="primary"
          type="submit"
        >
          Save
        </Button>
      </form>
    </FormProvider>
  );
}
