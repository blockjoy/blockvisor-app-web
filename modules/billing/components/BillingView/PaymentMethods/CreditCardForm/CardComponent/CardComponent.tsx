import { Ref, forwardRef } from 'react';
import {
  CardComponent as ChargeBeeCardComponent,
  CardNumber,
  CardExpiry,
  CardCVV,
} from '@chargebee/chargebee-js-react-wrapper';
import ChargebeeComponents from '@chargebee/chargebee-js-react-wrapper/dist/components/ComponentGroup';
import { CHARGEBEE_OPTIONS } from '@modules/billing';
import { typo } from 'styles/utils.typography.styles';
import { flex } from 'styles/utils.flex.styles';
import {
  inputField,
  inputFieldDefault,
  inputTypesStyle,
} from '@shared/components/Forms/ReactHookForm/Input/Input.styles';
import {
  inputLabel,
  inputLabelSize,
} from '@shared/components/Forms/ReactHookForm/Input/InputLabel.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { form as formStyles } from 'styles/form.styles';

type CardComponentProps = {
  variant?: 'default' | 'simple';
};

export const CardComponent = forwardRef(
  (
    { variant = 'default' }: CardComponentProps,
    ref: Ref<ChargebeeComponents>,
  ) => {
    const { style, classes, locale, placeholder } = CHARGEBEE_OPTIONS;

    return (
      <ChargeBeeCardComponent
        ref={ref}
        className="fieldset field"
        styles={style}
        classes={classes}
        locale={locale}
        placeholder={placeholder}
        {...(variant === 'simple' && {
          css: [inputField, inputTypesStyle['medium'], inputFieldDefault],
        })}
      >
        {variant === 'default' && (
          <>
            <div css={[spacing.bottom.medium]}>
              <label css={[inputLabel, inputLabelSize.small, typo.base]}>
                Card number
              </label>
              <div
                css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
              >
                <CardNumber />
              </div>
            </div>
            <div css={[spacing.bottom.medium, formStyles.row]}>
              <div
                css={[
                  flex.display.flex,
                  flex.direction.column,
                  flex.basis.b100,
                ]}
              >
                <label css={[inputLabel, inputLabelSize.small, typo.base]}>
                  Expiration date
                </label>
                <div
                  css={[
                    inputField,
                    inputTypesStyle['medium'],
                    inputFieldDefault,
                  ]}
                >
                  <CardExpiry />
                </div>
              </div>
              <div
                css={[
                  flex.display.flex,
                  flex.direction.column,
                  flex.basis.b100,
                ]}
              >
                <label css={[inputLabel, inputLabelSize.small, typo.base]}>
                  CVV
                </label>
                <div
                  css={[
                    inputField,
                    inputTypesStyle['medium'],
                    inputFieldDefault,
                  ]}
                >
                  <CardCVV />
                </div>
              </div>
            </div>
          </>
        )}
      </ChargeBeeCardComponent>
    );
  },
);
