import { useRecoilValue } from 'recoil';
import { Button } from '@shared/index';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './PaymentMethodForm.styles';
import {
  inputField,
  inputFieldDefault,
  inputTypesStyle,
} from '@shared/components/Forms/ReactHookForm/Input/Input.styles';
import {
  billingAtoms,
  BillingInfoData,
  billingSelectors,
  CHARGEBEE_OPTIONS,
  PaymentMethodInfoForm,
  useBillingAddress,
  usePaymentMethodForm,
} from '@modules/billing';
import { ChangeEvent, useRef, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { flex } from 'styles/utils.flex.styles';
import { colors } from 'styles/utils.colors.styles';
import { CardComponent } from '@chargebee/chargebee-js-react-wrapper';
import { useIdentityRepository } from '@modules/auth';

type PaymentMethodFormProps = {
  handleCancel: VoidFunction;
  handleSubmit: VoidFunction;
};

export const PaymentMethodFormSimple = ({
  handleCancel,
  handleSubmit,
}: PaymentMethodFormProps) => {
  const loading = useRecoilValue(billingAtoms.addPaymentMethodLoadingState);
  const billingAddress = useRecoilValue(billingSelectors.billingAddress);
  const error = useRecoilValue(billingAtoms.paymentMethodError);

  const cardRef = useRef<any>(null);

  const repository = useIdentityRepository();
  const user = repository?.getIdentity();

  const { style, classes, locale, placeholder } = CHARGEBEE_OPTIONS;

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

  const { onSubmit } = usePaymentMethodForm();
  const { addBillingAddress } = useBillingAddress();

  const handleSucces = (paymentSourceId: string, customerId: string) => {
    if (isDefaultAddress || !billingAddress)
      addBillingAddress(customerId, { ...billingInfo, ...cardHolder });

    handleCancel();
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

    await onSubmit(cardRef, additionalData, handleSucces);
    handleSubmit();
  };

  const handleIsDefaultAddress = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsDefaultAddress(!isDefaultAddress);
  };

  return (
    <div css={styles.wrapper}>
      <h4 css={styles.headline}>CARD DETAILS</h4>
      <CardComponent
        ref={cardRef}
        className="fieldset field"
        css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
        styles={style}
        classes={classes}
        locale={locale}
        placeholder={placeholder}
      />

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

      {error && (
        <p
          css={[
            typo.smaller,
            colors.warning,
            spacing.top.medium,
            spacing.bottom.medium,
          ]}
        >
          An error occured. Please check your inputs.
        </p>
      )}

      <div css={styles.buttons}>
        <Button
          loading={loading !== 'finished'}
          style="primary"
          size="small"
          type="submit"
          tabIndex={5}
          onClick={handleCreatePaymentMethod}
        >
          Add
        </Button>
        <Button
          onClick={handleCancel}
          style="outline"
          size="small"
          tabIndex={6}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
