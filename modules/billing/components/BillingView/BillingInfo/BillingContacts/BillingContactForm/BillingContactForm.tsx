import { FormProvider } from 'react-hook-form';
import { styles } from './BillingContactForm.styles';
import { useBillingContactsForm } from '@modules/billing';
import { Button, Input, ButtonGroup } from '@shared/components';
import { isValidEmail } from '@shared/index';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { containers } from 'styles/containers.styles';

export type BillingContactFormProps = {
  actions: BillingContactsActions;
};

export const BillingContactForm = ({ actions }: BillingContactFormProps) => {
  const {
    loading,
    form,

    onSubmit,
  } = useBillingContactsForm(actions);

  const {
    formState: { isValid },
  } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} css={containers.mediumSmall}>
        <ul css={[reset.list]}>
          <li css={[styles.formItem]}>
            <Input
              name="name"
              label="Name"
              placeholder="John Doe"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={1}
              validationOptions={{
                required: 'Name is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              name="email"
              label="Email"
              placeholder="Email"
              inputSize="medium"
              labelStyles={[typo.base]}
              type="email"
              tabIndex={2}
              validationOptions={{
                required: 'Email is required',
                pattern: {
                  value: isValidEmail(),
                  message: 'Email format is not correct',
                },
              }}
            />
          </li>
        </ul>
        <ButtonGroup>
          <Button
            loading={loading}
            disabled={loading || !isValid}
            style="secondary"
            size="small"
            type="submit"
            tabIndex={3}
          >
            Add
          </Button>
          <Button
            onClick={() => actions.cancel()}
            style="outline"
            size="small"
            tabIndex={4}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </FormProvider>
  );
};
