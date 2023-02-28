import { PasswordTracker } from '@modules/auth/hooks/usePasswordStrength';
import { display } from 'styles/utils.display.styles';
import { styles } from './PasswordMeter.styles';

export type PasswordMeterProps = {
  meter: boolean;
  passwordStrength: number;
  passwordTracker: PasswordTracker;
  passwordMessage: () => string;
  isLabeled: boolean;
  isCompact?: boolean;
};

export const PasswordMeter = ({
  meter,
  passwordStrength,
  passwordTracker,
  passwordMessage,
  isLabeled,
  isCompact,
}: PasswordMeterProps) => {
  if (!meter) return null;

  const message = passwordMessage();
  const title = !passwordTracker.eightCharsOrGreater
    ? 'Minimum length 8 characters'
    : `${message} Password`;

  return meter ? (
    <>
      <div
        css={[
          styles.tooltip,
          !isCompact && styles.tooltipFloating,
          isLabeled && styles.tooltipTop,
        ]}
      >
        <div
          css={[
            styles.tooltipContainer,
            !isCompact && styles.tooltipContainerFloating,
          ]}
        >
          <div css={styles.summary}>
            <p css={styles.title}>{title}</p>
            <div
              css={styles.meter(
                !passwordTracker.eightCharsOrGreater ? 0 : passwordStrength,
              )}
            ></div>
          </div>
          <div>
            <ul
              css={[styles.hintsContent, isCompact && display.visuallyHidden]}
            >
              <li
                css={[
                  styles.hint,
                  passwordTracker.letters ? styles.hintDisabled : '',
                ]}
              >
                Uppercase letter
              </li>
              <li
                css={[
                  styles.hint,
                  passwordTracker.number ? styles.hintDisabled : '',
                ]}
              >
                Number
              </li>
              <li
                css={[
                  styles.hint,
                  passwordTracker.specialChar ? styles.hintDisabled : '',
                ]}
              >
                Symbol (#$&)
              </li>

              <li
                css={[
                  styles.hint,
                  passwordTracker.long ? styles.hintDisabled : '',
                ]}
              >
                Long password
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ) : null;
};
