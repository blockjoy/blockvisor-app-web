import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, ButtonGroup } from '@shared/components';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './PaymentMethodForm.styles';
import {
  billingAtoms,
  BillingInfoData,
  billingSelectors,
  CardComponent,
  generatePaymentError,
  PaymentMethodFormHeader,
  PaymentMethodInfoForm,
  useBillingAddress,
  usePaymentMethodForm,
} from '@modules/billing';
import { useIdentityRepository } from '@modules/auth';
import { spacing } from 'styles/utils.spacing.styles';
import { flex } from 'styles/utils.flex.styles';
import { colors } from 'styles/utils.colors.styles';
import { containers } from 'styles/containers.styles';

type PaymentMethodFormProps = {
  handleCancel: VoidFunction;
  handleSubmit: VoidFunction;
  handleHide: VoidFunction;
};

export const PaymentMethodFormSimple = ({
  handleCancel,
  handleSubmit,
  handleHide,
}: PaymentMethodFormProps) => {
  const billingAddress = useRecoilValue(billingSelectors.billingAddress);
  const [error, setError] = useRecoilState(billingAtoms.paymentMethodError);
  const setPaymentMethodLoadingState = useSetRecoilState(
    billingAtoms.paymentMethodLoadingState,
  );

  const cardRef = useRef<any>(null);

  const repository = useIdentityRepository();
  const user = repository?.getIdentity();

  const cardHolder = {
    firstName: user?.firstName,
    lastName: user?.lastName,
  };

  const [billingInfo, setBillingInfo] = useState<BillingInfoData>({
    address: '',
    country: '',
    city: '',
    postal: '',
  });

  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);

  const { loading, onSubmit } = usePaymentMethodForm();
  const { addBillingAddress } = useBillingAddress();

  useEffect(() => {
    return () => {
      setError(null);
      setPaymentMethodLoadingState('initializing');
    };
  }, []);

  const handleSucces = async (customerId: string) => {
    if ((isDefaultAddress || !billingAddress) && customerId)
      await addBillingAddress(customerId, { ...billingInfo, ...cardHolder });

    handleHide();
  };

  const handleCreatePaymentMethod = async () => {
    const additionalData: { billingAddress: BillingAddressAdditionalData } = {
      billingAddress: {
        firstName: cardHolder.firstName,
        lastName: cardHolder.lastName,
        addressLine1: billingInfo.address,
        addressLine2: '',
        city: billingInfo.city,
        zip: billingInfo.postal,
        countryCode: billingInfo.country,
        state: '',
        stateCode: '',
      },
    };

    try {
      await onSubmit(cardRef, additionalData, handleSucces);
      handleSubmit();
    } catch (error: any) {
      console.log('Error while adding a payment method', error);
    }
  };

  const handleIsDefaultAddress = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsDefaultAddress(!isDefaultAddress);
  };

  const errorMessage = error ? generatePaymentError(error) : null;

  const isValidInfoForm = Object.values(billingInfo).every(
    (value) => value.trim() !== '',
  );

  return (
    <div css={containers.mediumSmall}>
      <PaymentMethodFormHeader />

      <div style={{ minHeight: '45px' }}>
        <CardComponent ref={cardRef} variant="simple" />
      </div>

      <div css={spacing.top.large}>
        <div css={[flex.display.flex, flex.direction.row]}>
          <h4 css={styles.headline}>BILLING INFO</h4>
        </div>

        <div>
          <PaymentMethodInfoForm
            type="simple"
            billingInfo={billingInfo}
            setBillingInfo={setBillingInfo}
            isDefaultAddress={isDefaultAddress}
            handleIsDefaultAddress={handleIsDefaultAddress}
          />
        </div>
      </div>

      {errorMessage && (
        <p
          css={[
            typo.smaller,
            colors.warning,
            spacing.top.medium,
            spacing.bottom.medium,
          ]}
        >
          {errorMessage}
        </p>
      )}
      <ButtonGroup type="flex">
        <Button
          loading={loading}
          disabled={loading || !isValidInfoForm}
          style="primary"
          size="small"
          type="submit"
          tabIndex={5}
          onClick={handleCreatePaymentMethod}
          customCss={[styles.confirmButton]}
        >
          Confirm and Activate
        </Button>
        <Button
          onClick={handleCancel}
          style="outline"
          size="small"
          tabIndex={6}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
};
