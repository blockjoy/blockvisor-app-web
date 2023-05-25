import { ChangeEvent, useRef, useState } from 'react';
import {
  CardComponent,
  CardNumber,
  CardExpiry,
  CardCVV,
} from '@chargebee/chargebee-js-react-wrapper';
import { Button } from '@shared/index';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './CreditCardForm.styles';
import {
  inputField,
  inputFieldDefault,
  inputTypesStyle,
  inputWrapper,
} from '@shared/components/Forms/ReactHookForm/Input/Input.styles';
import {
  inputLabel,
  inputLabelSize,
} from '@shared/components/Forms/ReactHookForm/Input/InputLabel.styles';
import { flex } from 'styles/utils.flex.styles';
import {
  usePaymentMethods,
  usePayment,
  CHARGEBEE_OPTIONS,
} from '@modules/billing';
import { PaymentIntent } from 'chargebee-typescript/lib/resources';

export type CreditCardFormProps = {
  handleCancel: VoidFunction;
};

export type CardHolder = {
  firstName: string;
  lastName: string;
};

export const CreditCardForm = ({ handleCancel }: CreditCardFormProps) => {
  const { style, classes, locale, placeholder } = CHARGEBEE_OPTIONS;

  const cardRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cardHolder, setCardHolder] = useState<CardHolder>({
    firstName: '',
    lastName: '',
  });

  const { createIntent } = usePayment();
  const { createPaymentMethod } = usePaymentMethods();

  const onSubmit = async () => {
    setLoading(true);

    const intent: PaymentIntent = await createIntent();

    const additionalData = {
      billingAddress: {
        firstName: cardHolder.firstName,
        lastName: cardHolder.lastName,
      },
    };

    cardRef.current
      .authorizeWith3ds(intent, additionalData)
      .then((data: PaymentIntent) => {
        console.log('authorizeWith3ds Data', data);
        createPaymentMethod(data.id);
        handleCancel();
      })
      .catch((error: any) => {
        console.log('authorizeWith3ds Error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCardHolder((cardHolder: CardHolder) => ({
      ...cardHolder,
      [name]: value,
    }));
  };

  return (
    <div css={styles.wrapper}>
      <div>
        <div css={[styles.formItem, styles.formRow]}>
          <div
            css={[flex.display.flex, flex.direction.column, flex.basis.b100]}
          >
            <label css={[inputLabel, inputLabelSize.small, typo.base]}>
              First name
            </label>
            <div css={[inputWrapper]}>
              <input
                name="firstName"
                css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
                type="text"
                placeholder="John"
                value={cardHolder.firstName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div
            css={[flex.display.flex, flex.direction.column, flex.basis.b100]}
          >
            <label css={[inputLabel, inputLabelSize.small, typo.base]}>
              Last name
            </label>
            <div css={[inputWrapper]}>
              <input
                name="lastName"
                css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
                type="text"
                placeholder="Doe"
                value={cardHolder.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <CardComponent
          ref={cardRef}
          className="fieldset field"
          styles={style}
          classes={classes}
          locale={locale}
          placeholder={placeholder}
        >
          <div css={[styles.formItem]}>
            <label css={[inputLabel, inputLabelSize.small, typo.base]}>
              Card number
            </label>
            <div css={[inputWrapper]}>
              <CardNumber
                css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
              />
            </div>
          </div>
          <div css={[styles.formItem, styles.formRow]}>
            <div
              css={[flex.display.flex, flex.direction.column, flex.basis.b100]}
            >
              <label css={[inputLabel, inputLabelSize.small, typo.base]}>
                Expiry
              </label>
              <div css={[inputWrapper]}>
                <CardExpiry
                  css={[
                    inputField,
                    inputTypesStyle['medium'],
                    inputFieldDefault,
                  ]}
                />
              </div>
            </div>
            <div
              css={[flex.display.flex, flex.direction.column, flex.basis.b100]}
            >
              <label css={[inputLabel, inputLabelSize.small, typo.base]}>
                CVV
              </label>
              <div css={[inputWrapper]}>
                <CardCVV
                  css={[
                    inputField,
                    inputTypesStyle['medium'],
                    inputFieldDefault,
                  ]}
                />
              </div>
            </div>
          </div>
        </CardComponent>
      </div>

      <div css={styles.buttons}>
        <Button
          loading={loading}
          style="primary"
          size="small"
          type="submit"
          tabIndex={5}
          onClick={onSubmit}
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
