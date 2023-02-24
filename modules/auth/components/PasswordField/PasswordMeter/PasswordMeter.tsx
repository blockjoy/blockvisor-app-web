import { PasswordTracker } from '@modules/auth/hooks/usePasswordStrength';
import { styles } from './PasswordMeter.styles';

export type PasswordMeterProps = {
  meter: boolean;
  passwordStrength: number;
  passwordTracker: PasswordTracker;
  passwordMessage: () => string;
  isLabeled: boolean;
};

export const PasswordMeter = ({
  meter,
  passwordStrength,
  passwordTracker,
  passwordMessage,
  isLabeled,
}: PasswordMeterProps) => {
  if (!meter) return null;

  const message = passwordMessage();
  const title = !passwordTracker.eightCharsOrGreater
    ? 'Must have at least 8 characters.'
    : `${message} Password`;

  return (
    meter && (
      <>
        <div css={[styles.tooltip, isLabeled && styles.tooltipTop]}>
          <div css={styles.tooltipContainer}>
            <div css={styles.summary}>
              <p css={styles.title}>{title}</p>
              <div
                css={styles.meter(
                  !passwordTracker.eightCharsOrGreater ? 0 : passwordStrength,
                )}
              ></div>
            </div>
            <div>
              <ul css={styles.hintsContent}>
                <li
                  css={[
                    styles.hint,
                    passwordTracker.letters ? styles.hintDisabled : '',
                  ]}
                >
                  Upper & lower case letters
                </li>
                <li
                  css={[
                    styles.hint,
                    passwordTracker.specialChar ? styles.hintDisabled : '',
                  ]}
                >
                  A symbol (#$&)
                </li>
                <li
                  css={[
                    styles.hint,
                    passwordTracker.number ? styles.hintDisabled : '',
                  ]}
                >
                  A number
                </li>
                <li
                  css={[
                    styles.hint,
                    passwordTracker.long ? styles.hintDisabled : '',
                  ]}
                >
                  A longer password
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  );
};
