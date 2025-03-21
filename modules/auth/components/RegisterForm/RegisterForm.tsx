import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, Button, Input } from '@shared/components';
import { display } from 'styles/utils.display.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { reset } from 'styles/utils.reset.styles';
import { isValidEmail } from '@shared/utils/validation';
import Router, { useRouter } from 'next/router';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { Routes } from '@modules/auth/utils/routes';
import { isStatusResponse } from '@modules/organization';
import { handleTokenFromQueryString } from '@modules/auth/utils/handleTokenFromQueryString';
import { PasswordField } from '../PasswordField/PasswordField';
import { usePasswordStrength } from '@modules/auth/hooks/usePasswordStrength';
import { userClient } from '@modules/grpc';
import { styles } from './RegisterForm.styles';

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const getError = (message: string) => {
  if (message?.toLowerCase()?.includes('exists')) {
    return 'Email address already registered';
  } else {
    return 'Error creating account, please contact our support team.';
  }
};

export function RegisterForm() {
  const router = useRouter();
  const { invited, token } = router.query;

  const form = useForm<RegisterForm>({
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  const [registerError, setRegisterError] = useState<string | undefined>();
  const [loading, setIsLoading] = useState(false);
  const { handleSubmit, setValue, formState, watch } = form;
  const { isValid } = formState;

  const { setPassword } = usePasswordStrength();

  const onSubmit = handleSubmit(
    async ({ email, password, firstName, lastName }) => {
      setIsLoading(true);
      const response = await userClient.createUser(
        {
          firstName,
          lastName,
          email,
          password,
        },
        token as string,
      );

      if (isStatusResponse(response)) {
        setRegisterError(getError(response.message));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      Router.push(Routes.verify);
    },
  );

  useEffect(() => {
    if (router.isReady) {
      if (token) {
        handleTokenFromQueryString(token?.toString()!, setValue);
      }
    }
  }, [router.isReady]);

  const watchPassword = watch('password');

  useEffect(() => {
    setPassword(form.getValues().password);
  }, [watchPassword]);

  return (
    <>
      {invited && (
        <Alert isSuccess>
          You've been invited to a BlockVisor organization. Please create an
          account to accept.
        </Alert>
      )}
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <ul css={[reset.list]}>
            <li css={[spacing.bottom.mediumSmall]}>
              <Input
                shouldAutoFocus
                tabIndex={1}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
                name="firstName"
                placeholder="First name"
                validationOptions={{
                  required: 'Your first name is required',
                }}
              />
            </li>
            <li css={[spacing.bottom.mediumSmall]}>
              <Input
                tabIndex={2}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
                name="lastName"
                placeholder="Last name"
                validationOptions={{
                  required: 'Your last name is required',
                }}
              />
            </li>
            <li css={[spacing.bottom.mediumSmall]}>
              <Input
                tabIndex={3}
                labelStyles={[display.visuallyHidden]}
                disabled={loading}
                name="email"
                placeholder="Email"
                validationOptions={{
                  required: 'Your email address is required',
                  pattern: {
                    value: isValidEmail(),
                    message: 'Email format is not correct',
                  },
                }}
              />
            </li>
            <li css={[spacing.bottom.medium]}>
              <PasswordField
                loading={loading}
                tabIndex={4}
                name="password"
                placeholder="Password"
              />
            </li>
          </ul>
          <Button
            tabIndex={6}
            loading={loading}
            disabled={loading || !isValid}
            size="medium"
            display="block"
            style="primary"
            type="submit"
          >
            Create Account
          </Button>
          <div css={styles.marketing}>
            By creating an account, you agree to BlockVisor's{' '}
            <a href="#">Terms & Conditions</a>
            {` `}
            and{` `}
            <a href="#">Privacy Policy</a>.
          </div>
          {registerError && (
            <p css={[typo.smaller, colors.warning, spacing.top.medium]}>
              {registerError}
            </p>
          )}
        </form>
      </FormProvider>
    </>
  );
}
