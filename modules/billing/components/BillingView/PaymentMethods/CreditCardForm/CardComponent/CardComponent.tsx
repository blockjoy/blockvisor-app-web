import { Ref, forwardRef } from 'react';
import {
  CardComponent as ChargeBeeCardComponent,
  CardNumber,
  CardExpiry,
  CardCVV,
} from '@chargebee/chargebee-js-react-wrapper';
import { CHARGEBEE_OPTIONS } from '@modules/billing';
import { typo } from 'styles/utils.typography.styles';
import { flex } from 'styles/utils.flex.styles';
import { styles } from './CardComponent.styles';
import {
  inputField,
  inputFieldDefault,
  inputTypesStyle,
} from '@shared/components/Forms/ReactHookForm/Input/Input.styles';
import {
  inputLabel,
  inputLabelSize,
} from '@shared/components/Forms/ReactHookForm/Input/InputLabel.styles';

type CardComponentProps = {
  variant?: 'default' | 'simple';
};

export const CardComponent = forwardRef(
  ({ variant = 'default' }: CardComponentProps, ref: Ref<any>) => {
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
            <div css={[styles.formItem]}>
              <label css={[inputLabel, inputLabelSize.small, typo.base]}>
                Card number
              </label>
              <div
                css={[inputField, inputTypesStyle['medium'], inputFieldDefault]}
              >
                <CardNumber />
              </div>
            </div>
            <div css={[styles.formItem, styles.formRow]}>
              <div
                css={[
                  flex.display.flex,
                  flex.direction.column,
                  flex.basis.b100,
                ]}
              >
                <label css={[inputLabel, inputLabelSize.small, typo.base]}>
                  Expiry
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
