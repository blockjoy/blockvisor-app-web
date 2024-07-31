import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import {
  Controller,
  FormProvider,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { Address } from '@modules/grpc/library/blockjoy/common/v1/address';
import { capitalize } from 'utils/capitalize';
import { billingAtoms, useBillingAddress } from '@modules/billing';
import {
  ButtonGroup,
  Button,
  CountrySelector,
  StateSelector,
  Input,
  FormError,
} from '@shared/components';
import { STATE_TYPE } from '@shared/index';
import { reset as resetStyles } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { containers } from 'styles/containers.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { form as formStyles } from 'styles/form.styles';

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

  const form: UseFormReturn<Address> = useForm<Address>({
    defaultValues: {
      city: billingAddress?.city ?? '',
      country: billingAddress?.country ?? '',
      line1: billingAddress?.line1 ?? '',
      line2: billingAddress?.line2 ?? '',
      postalCode: billingAddress?.postalCode ?? '',
      state: billingAddress?.state ?? '',
    },
  });

  const { formState, watch, reset } = form;
  const { isValid, isDirty } = formState;

  const selectedCountry = watch('country');

  const { createBillingAddress } = useBillingAddress();

  const handleSubmit = async (address: Address) => {
    await createBillingAddress(
      address,
      () =>
        toast.success(
          `Billing address ${
            !!billingAddress ? 'updated' : 'created'
          } successfully`,
        ),
      (err) => setError(err),
    );
  };

  const state = selectedCountry ? STATE_TYPE[selectedCountry] : null;
  const stateLabel = state ? capitalize(state) : null;

  // reset({}, { keepValues: true });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        css={containers.mediumSmall}
      >
        <ul css={[resetStyles.list]}>
          {/* <li css={[spacing.bottom.medium]}>
            <Input
              name="company"
              label="Company (optional)"
              placeholder="Company"
              inputSize="medium"
              labelStyles={[typo.base]}
            />
          </li> */}
          <li css={[spacing.bottom.medium]}>
            <Input
              name="line1"
              label="Address line 1"
              placeholder="Street address"
              inputSize="medium"
              labelStyles={[typo.base]}
              validationOptions={{
                required: 'Address is required',
              }}
            />
          </li>
          <li css={[spacing.bottom.medium]}>
            <Input
              name="line2"
              label="Address line 2"
              placeholder="Apt., suite, unit number, etc. (optional)"
              inputSize="medium"
              labelStyles={[typo.base]}
            />
          </li>
          <li css={[spacing.bottom.medium]}>
            <Controller
              name="country"
              rules={{ required: 'Country is required' }}
              render={({ field: { name, onChange, value } }) => (
                <CountrySelector
                  name={name}
                  value={value}
                  label="Country"
                  labelStyles={[typo.base]}
                  onChange={onChange}
                />
              )}
            />
          </li>
          {stateLabel && (
            <li css={[spacing.bottom.medium]}>
              <Controller
                name="state"
                rules={{ required: 'State is required' }}
                render={({ field: { name, onChange, value } }) => (
                  <StateSelector
                    name={name}
                    value={value}
                    label={stateLabel}
                    labelStyles={[typo.base]}
                    onChange={onChange}
                    country={selectedCountry}
                  />
                )}
              />
            </li>
          )}
          <li css={[spacing.bottom.medium, formStyles.row]}>
            <div css={formStyles.col}>
              <Input
                name="city"
                label="City"
                placeholder="City"
                inputSize="medium"
                labelStyles={[typo.base]}
                validationOptions={{
                  required: 'City is required',
                }}
              />
            </div>
            <div css={formStyles.col}>
              <Input
                name="postalCode"
                label="Postal code"
                placeholder="Postal code"
                inputSize="medium"
                labelStyles={[typo.base]}
                validationOptions={{
                  required: 'Postal code is required',
                }}
              />
            </div>
          </li>
        </ul>
        <ButtonGroup>
          <Button
            loading={billingAddressLoadingState !== 'finished'}
            style="primary"
            size="small"
            type="submit"
            disabled={!isValid || !isDirty}
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
