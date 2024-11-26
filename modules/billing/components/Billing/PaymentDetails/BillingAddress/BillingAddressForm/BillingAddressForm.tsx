import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { Address } from '@modules/grpc/library/blockjoy/common/v1/address';
import { ButtonGroup, Button, FormError } from '@shared/components';
import {
  BillingAddressFormFields,
  billingAtoms,
  useBillingAddress,
} from '@modules/billing';
import { containers } from 'styles/containers.styles';

type BillingAddressFormProps = {
  handleCancel: () => void;
};

export const BillingAddressForm = ({
  handleCancel,
}: BillingAddressFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const billingAddress = useRecoilValue(billingAtoms.billingAddress);
  const billingAddressLoadingState = useRecoilValue(
    billingAtoms.billingAddressLoadingState,
  );

  const defaultValues: Address = {
    city: '',
    country: '',
    line1: '',
    line2: '',
    postalCode: '',
    state: '',
    ...billingAddress,
  };

  const form = useForm<Address>({
    defaultValues,
  });

  const {
    formState: { isValid, isDirty },
  } = form;

  const { createBillingAddress } = useBillingAddress();

  const handleSubmit = async (address: Address) => {
    await createBillingAddress(
      address,
      () => {
        form.reset(address);

        toast.success(
          `Billing address ${
            !!billingAddress ? 'updated' : 'created'
          } successfully`,
        );
      },
      (err) => setError(err),
    );
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        css={containers.mediumSmall}
      >
        <BillingAddressFormFields form={form} />
        <ButtonGroup>
          <Button
            loading={billingAddressLoadingState !== 'finished'}
            style="primary"
            size="small"
            type="submit"
            disabled={
              billingAddressLoadingState !== 'finished' || !isValid || !isDirty
            }
          >
            {Boolean(billingAddress) ? 'Update' : 'Add'}
          </Button>
          {!Boolean(billingAddress) && (
            <Button onClick={handleCancel} style="outline" size="small">
              Cancel
            </Button>
          )}
        </ButtonGroup>

        <FormError isVisible={Boolean(error)}>{error}</FormError>
      </form>
    </FormProvider>
  );
};
