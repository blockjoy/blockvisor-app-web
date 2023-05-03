import { styles } from './BillingContactForm.styles';
import { useBillingContactsForm } from '@modules/billing/';
import { Button, Input } from '@shared/components';
import { FormProvider } from 'react-hook-form';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';

export type BillingContactFormProps = {
  actions: BillingContactsActions;
};

export const BillingContactForm = ({ actions }: BillingContactFormProps) => {
  const {
    loading,
    form,

    onSubmit,

    nameController,
    emailController,
  } = useBillingContactsForm(actions);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} css={styles.wrapper}>
        <ul css={[reset.list]}>
          <li css={[styles.formItem]}>
            <Input
              label="Name"
              placeholder="John Doe"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={1}
              {...nameController.field}
              ref={null}
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
              tabIndex={2}
              {...emailController.field}
              ref={null}
              validationOptions={{
                required: 'Email is required',
              }}
            />
          </li>
        </ul>
        <div css={styles.buttons}>
          <Button
            loading={loading}
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
        </div>
      </form>
    </FormProvider>
  );
};
