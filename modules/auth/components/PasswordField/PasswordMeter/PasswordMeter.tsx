import { PasswordTracker } from '@modules/auth/hooks/usePasswordStrength';
import { Tooltip } from '@shared/components';
import { styles } from './PasswordMeter.styles';

export type PasswordMeterProps = {
  meter: boolean;
  passwordStrength: number;
  passwordTracker: PasswordTracker;
  passwordMessage: () => string;
};

export const PasswordMeter = ({
  meter,
  passwordStrength,
  passwordTracker,
  passwordMessage,
}: PasswordMeterProps) => {
  if (!meter) return null;

  const message = passwordMessage();
  const title = !passwordTracker.eightCharsOrGreater
    ? 'Must have at least 8 characters.'
    : `${message} Password`;

  return (
    meter && (
      <>
        <div css={styles.wrapper}>
          <div
            css={styles.meter(
              !passwordTracker.eightCharsOrGreater ? 0 : passwordStrength,
            )}
          ></div>
          <p css={styles.mobileTitle}>{title}</p>
        </div>
        <div css={styles.tooltip}>
          <div css={styles.tooltipContainer}>
            <div css={styles.tooltipContent}>
              <div css={styles.summary}>
                <p css={styles.title}>{title}</p>
                <div
                  css={styles.meter(
                    !passwordTracker.eightCharsOrGreater ? 0 : passwordStrength,
                  )}
                ></div>
              </div>
              <div css={styles.hints}>
                <p>It's better to have:</p>
                <ul css={styles.hintsList}>
                  <li css={passwordTracker.letters && styles.hintDisabled}>
                    Upper & lower case letters
                  </li>
                  <li css={passwordTracker.specialChar && styles.hintDisabled}>
                    A symbol (#$&)
                  </li>
                  <li css={passwordTracker.number && styles.hintDisabled}>
                    A number
                  </li>
                  <li css={passwordTracker.long && styles.hintDisabled}>
                    A longer password
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
