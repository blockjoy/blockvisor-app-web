import { Button, Checkbox } from '@shared/index';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './PaymentMethodForm.styles';
import {
  inputLabel,
  inputLabelSize,
} from '@shared/components/Forms/ReactHookForm/Input/InputLabel.styles';
import {
  BillingAddressSelect,
  billingAtoms,
  BillingInfoData,
  billingSelectors,
  CardHolder,
  CreditCardForm,
  PaymentMethodInfoForm,
  useCustomer,
} from '@modules/billing';
import { useRecoilValue } from 'recoil';
import { usePaymentMethodForm } from '@modules/billing/hooks/usePaymentMethodForm';
import { ChangeEvent, useRef, useState } from 'react';
import { spacing } from 'styles/utils.spacing.styles';
import { flex } from 'styles/utils.flex.styles';
import { colors } from 'styles/utils.colors.styles';

type PaymentMethodFormProps = {
  handleCancel: VoidFunction;
};

export const PaymentMethodForm = ({ handleCancel }: PaymentMethodFormProps) => {
  const loading = useRecoilValue(billingAtoms.addPaymentMethodLoadingState);
  const billingAddress = useRecoilValue(billingSelectors.billingAddress);
  const error = useRecoilValue(billingAtoms.paymentMethodError);
  const paymentMethods = useRecoilValue(billingAtoms.paymentMethods);

  const cardRef = useRef<any>(null);

  const [cardHolder, setCardHolder] = useState<CardHolder>({
    firstName: '',
    lastName: '',
  });

  const [billingInfo, setBillingInfo] = useState<BillingInfoData>({
    address: '',
    country: '',
    city: '',
    postal: '',
  });

  const [primary, setPrimary] = useState<boolean>(false);

  const { onSubmit } = usePaymentMethodForm();
  const { assignPaymentRole } = useCustomer();

  const handleSucces = (paymentSourceId: string) => {
    if (primary || !paymentMethods.length)
      assignPaymentRole({
        payment_source_id: paymentSourceId,
        role: 'primary',
      });
    handleCancel();
  };

  const handleSubmit = () => {
    const firstName =
      activeView === 'action'
        ? cardHolder.firstName
        : billingAddress?.first_name;
    const lastName =
      activeView === 'action' ? cardHolder.lastName : billingAddress?.last_name;
    const addressLine1 =
      activeView === 'action' ? billingInfo.address : billingAddress?.line1;
    const city =
      activeView === 'action' ? billingInfo.city : billingAddress?.city;
    const zip =
      activeView === 'action' ? billingInfo.postal : billingAddress?.zip;
    const countryCode =
      activeView === 'action' ? billingInfo.country : billingAddress?.country;

    const additionalData = {
      billingAddress: {
        firstName,
        lastName,
        addressLine1,
        addressLine2: '',
        city,
        zip,
        countryCode,
        state: '',
        stateCode: '',
      },
    };

    onSubmit(cardRef, additionalData, handleSucces);
  };

  const defaultActiveView = billingAddress ? 'list' : 'action';
  const [activeView, setActiveView] =
    useState<'list' | 'action'>(defaultActiveView);

  const handleDefaultAddress = () => setActiveView('list');
  const handleNewAddress = () => setActiveView('action');
  const handlePrimary = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setPrimary(!primary);
  };

  return (
    <div css={styles.wrapper}>
      <h4 css={styles.headline}>CARD DETAILS</h4>
      <CreditCardForm
        ref={cardRef}
        cardHolder={cardHolder}
        setCardHolder={setCardHolder}
      />

      {paymentMethods && paymentMethods.length ? (
        <Checkbox
          id="primary"
          name="primary"
          checked={primary}
          onChange={handlePrimary}
        >
          Save as primary
        </Checkbox>
      ) : null}

      <div css={spacing.top.large}>
        <div css={[flex.display.flex, flex.direction.row]}>
          <h4 css={styles.headline}>BILLING INFO</h4>
          {activeView === 'action' && billingAddress && (
            <a onClick={handleDefaultAddress} css={styles.backToDefault}>
              Back to default
            </a>
          )}
        </div>
        {activeView === 'list' && billingAddress ? (
          <div css={[styles.formItem]}>
            <label css={[inputLabel, inputLabelSize.small, typo.base]}>
              Billing address
            </label>
            <BillingAddressSelect
              handlePaymentBillingAddress={handleDefaultAddress}
              onCreate={handleNewAddress}
            />
          </div>
        ) : (
          <div>
            <PaymentMethodInfoForm
              billingInfo={billingInfo}
              setBillingInfo={setBillingInfo}
            />
          </div>
        )}
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
          onClick={handleSubmit}
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
