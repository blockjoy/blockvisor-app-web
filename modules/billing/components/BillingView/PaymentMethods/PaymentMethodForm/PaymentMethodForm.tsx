import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Checkbox, Switch } from '@shared/components';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './PaymentMethodForm.styles';
import {
  inputLabel,
  inputLabelSize,
} from '@shared/components/Forms/ReactHookForm/Input/InputLabel.styles';
import {
  billingAtoms,
  BillingInfoData,
  billingSelectors,
  CardHolder,
  CreditCardForm,
  generatePaymentError,
  PaymentMethodFormHeader,
  PaymentMethodInfoForm,
  useBillingAddress,
  useCustomer,
  usePaymentMethodForm,
  useSubscription,
} from '@modules/billing';
import { spacing } from 'styles/utils.spacing.styles';
import { flex } from 'styles/utils.flex.styles';
import { colors } from 'styles/utils.colors.styles';
import { containers } from 'styles/containers.styles';

type PaymentMethodFormProps = {
  handleCancel: VoidFunction;
};

export const PaymentMethodForm = ({ handleCancel }: PaymentMethodFormProps) => {
  const router = useRouter();

  const billingAddress = useRecoilValue(billingSelectors.billingAddress);
  const [error, setError] = useRecoilState(billingAtoms.paymentMethodError);
  const paymentMethods = useRecoilValue(billingAtoms.paymentMethods);
  const setPaymentMethodLoadingState = useSetRecoilState(
    billingAtoms.paymentMethodLoadingState,
  );
  const subscription = useRecoilValue(billingSelectors.subscription);

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
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);

  const defaultActiveView = billingAddress ? 'list' : 'action';
  const [activeView, setActiveView] =
    useState<'list' | 'action'>(defaultActiveView);

  const { loading, onSubmit } = usePaymentMethodForm();
  const { assignPaymentRole } = useCustomer();
  const { addBillingAddress } = useBillingAddress();
  const { getSubscription } = useSubscription();

  const { update } = router.query;

  useEffect(() => {
    return () => {
      setError(null);
      setPaymentMethodLoadingState('initializing');
    };
  }, []);

  const handleSucces = async (customerId: string, paymentSourceId: string) => {
    if (primary && paymentMethods.length)
      await assignPaymentRole({
        payment_source_id: paymentSourceId,
        role: 'primary',
      });

    if (isDefaultAddress || !billingAddress)
      await addBillingAddress(customerId, { ...billingInfo, ...cardHolder });

    if (update && subscription?.id) getSubscription(subscription?.id);

    toast.success('Payment method added');

    handleCancel();
  };

  const handleSubmit = async () => {
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

    const additionalData: { billingAddress: BillingAddressAdditionalData } = {
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

    try {
      await onSubmit(cardRef, additionalData, handleSucces);
    } catch (error: any) {
      console.log('Error while adding a payment method', error);
    }
  };

  const handleDefaultAddress = () => setActiveView('list');
  const handleNewAddress = () => setActiveView('action');
  const handlePrimary = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setPrimary(!primary);
  };

  const handleIsDefaultAddress = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsDefaultAddress(!isDefaultAddress);
  };

  const errorMessage = error ? generatePaymentError(error) : null;

  const isValidInfoForm = Object.values(billingInfo).every(
    (value) => value.trim() !== '',
  );

  const isValidHolderForm = Object.values(cardHolder).every(
    (value) => value.trim() !== '',
  );

  return (
    <div css={containers.mediumSmall}>
      <PaymentMethodFormHeader />

      <CreditCardForm
        ref={cardRef}
        cardHolder={cardHolder}
        setCardHolder={setCardHolder}
      />

      <Checkbox
        id="primary"
        name="primary"
        checked={primary || !(paymentMethods && paymentMethods.length)}
        disabled={!(paymentMethods && paymentMethods.length)}
        onChange={handlePrimary}
      >
        Save as primary
      </Checkbox>

      <div css={spacing.top.large}>
        <div css={[flex.display.flex, flex.direction.row]}>
          <h4 css={styles.headline}>Billing Address</h4>
          {activeView === 'action' && billingAddress && (
            <a onClick={handleDefaultAddress} css={styles.backToDefault}>
              Back to default
            </a>
          )}
        </div>
        {activeView === 'list' && billingAddress ? (
          <div css={[spacing.bottom.medium]}>
            <div css={[flex.display.flex, flex.justify.between]}>
              <label css={[inputLabel, inputLabelSize.small, typo.base]}>
                {billingAddress?.line1}
                <br />
                {billingAddress?.zip} {billingAddress?.city},{' '}
                {billingAddress?.country}
              </label>
              <Switch
                name="defaultAddress"
                disabled={false}
                tooltip="Use default Billing address"
                checked={activeView === 'list'}
                onChange={handleNewAddress}
              />
            </div>
          </div>
        ) : (
          <div>
            <PaymentMethodInfoForm
              billingInfo={billingInfo}
              setBillingInfo={setBillingInfo}
              isDefaultAddress={isDefaultAddress}
              handleIsDefaultAddress={handleIsDefaultAddress}
            />
          </div>
        )}
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

      <ButtonGroup>
        <Button
          loading={loading}
          disabled={
            loading ||
            (activeView === 'action' && !isValidInfoForm) ||
            !isValidHolderForm
          }
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
      </ButtonGroup>
    </div>
  );
};
