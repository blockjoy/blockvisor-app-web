import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { PaymentMethodCreateParams } from '@stripe/stripe-js';
import { Address } from '@modules/grpc/library/blockjoy/common/v1/address';
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormError,
  Switch,
} from '@shared/components';
import {
  AvailablePayments,
  BillingAddressFormFields,
  CreditCardFormFields,
  billingAtoms,
  useBillingAddress,
  usePaymentMethod,
  formatAddress,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { containers } from 'styles/containers.styles';
import { styles } from './PaymentMethodForm.styles';
import { flex } from 'styles/utils.flex.styles';

type BillingAddressView = 'preview' | 'form';

type PaymentMethodFormProps = {
  handleCancel: VoidFunction;
};

export const PaymentMethodForm = ({ handleCancel }: PaymentMethodFormProps) => {
  const isValidCard = useRecoilValue(billingAtoms.isValidCard);

  const { paymentMethodLoadingState, initPaymentMethod } = usePaymentMethod();
  const { billingAddress, createBillingAddress } = useBillingAddress();

  const [saveAsDefaultAddress, setSaveAsDefaultAddress] = useState(
    !billingAddress,
  );
  const [billingAddressView, setBillingAddressView] =
    useState<BillingAddressView>(billingAddress ? 'preview' : 'form');
  const [error, setError] = useState<string | null>(null);

  const form = useForm<Address>();

  const {
    getValues,
    formState: { isValid: isValidBillingAddress },
  } = form;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidCard) return;

    let address = billingAddress;
    if (billingAddressView === 'form') address = getValues();

    const { postalCode, ...restAddress } = address ?? {};

    const billingDetails: PaymentMethodCreateParams.BillingDetails = {
      address: {
        ...restAddress,
        postal_code: postalCode,
      },
    };

    try {
      await initPaymentMethod(
        billingDetails,
        () => {
          if (saveAsDefaultAddress) return;

          toast.success('Payment method added');
          handleCancel();
        },
        (err) => setError(err),
      );

      if (saveAsDefaultAddress && address)
        await createBillingAddress(
          address,
          () => {
            toast.success('Payment method added');
            handleCancel();
          },
          (err) => setError(err),
        );
    } catch (error: any) {
      console.log('Error while adding a payment method', error);
    }
  };

  const handleBillinAddressView = (view: BillingAddressView) =>
    setBillingAddressView(view);

  const handleSaveAsDefaultToggle = () =>
    setSaveAsDefaultAddress(!saveAsDefaultAddress);

  const isLoading = paymentMethodLoadingState !== 'finished';

  return (
    <div css={containers.mediumSmall}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <div css={spacing.bottom.mediumLarge}>
            <div css={styles.header}>
              <h4 css={styles.headline}>Card details</h4>
              <AvailablePayments />
            </div>

            <CreditCardFormFields />
          </div>

          <div css={spacing.bottom.mediumLarge}>
            <div css={styles.header}>
              <h4 css={styles.headline}>Billing Address</h4>
              {billingAddressView === 'form' && billingAddress && (
                <a
                  onClick={() => handleBillinAddressView('preview')}
                  css={styles.backToDefault}
                >
                  Back to default
                </a>
              )}
            </div>

            {billingAddressView === 'preview' && billingAddress ? (
              <div css={[flex.display.flex, flex.justify.between]}>
                <div>{formatAddress(billingAddress)}</div>
                <Switch
                  name="defaultAddress"
                  disabled={false}
                  tooltip="Use default Billing address"
                  checked={billingAddressView === 'preview'}
                  onChange={() => handleBillinAddressView('form')}
                />
              </div>
            ) : (
              <>
                <BillingAddressFormFields form={form} />

                <Checkbox
                  id="default-address"
                  name="default-address"
                  checked={saveAsDefaultAddress}
                  disabled={!billingAddress}
                  onChange={handleSaveAsDefaultToggle}
                >
                  Save as default address
                </Checkbox>
              </>
            )}
          </div>

          <ButtonGroup>
            <Button
              loading={isLoading}
              disabled={
                isLoading ||
                !isValidCard ||
                (!isValidBillingAddress && billingAddressView === 'form')
              }
              style="primary"
              size="small"
              type="submit"
            >
              Add
            </Button>
            <Button onClick={handleCancel} style="outline" size="small">
              Cancel
            </Button>
          </ButtonGroup>

          <FormError isVisible={Boolean(error)}>{error}</FormError>
        </form>
      </FormProvider>
    </div>
  );
};
