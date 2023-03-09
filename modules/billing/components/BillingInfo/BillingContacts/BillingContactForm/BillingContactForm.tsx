import { styles } from './BillingContactForm.styles';
import { useBillingContacts } from '@modules/billing/';
import { Button, Input } from '@shared/components';
import { FormProvider } from 'react-hook-form';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';

export type BillingContactFormProps = {
  handleCancel: VoidFunction;
  billingContact: BillingContactForm;
};

export const BillingContactForm = ({
  handleCancel,
  billingContact,
}: BillingContactFormProps) => {
  const {
    loading,
    form,

    onSubmit,

    name,
    handleNameChange,

    email,
    handleEmailChange,
  } = useBillingContacts(billingContact);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} css={styles.wrapper}>
        <ul css={[reset.list]}>
          <li css={[styles.formItem]}>
            <Input
              name="name"
              label="Name"
              placeholder="John Doe"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={1}
              value={name}
              onChange={handleNameChange}
              validationOptions={{
                required: 'Name is required',
              }}
            />
          </li>
          <li css={[styles.formItem]}>
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              inputSize="medium"
              labelStyles={[typo.base]}
              tabIndex={2}
              value={email}
              onChange={handleEmailChange}
            />
          </li>
        </ul>
        <div css={styles.buttons}>
          <Button
            loading={loading}
            style="secondary"
            size="small"
            type="submit"
            tabIndex={9}
          >
            Add
          </Button>
          <Button
            onClick={handleCancel}
            style="outline"
            size="small"
            tabIndex={10}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
