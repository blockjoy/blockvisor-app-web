import { PasswordTracker } from '@modules/auth/hooks/usePasswordStrength';
import { SvgIcon } from '@shared/components';
import { isMobile } from 'react-device-detect';
import { display } from 'styles/utils.display.styles';
import IconInfo from '@public/assets/icons/info.svg';
import { styles } from './PasswordMeter.styles';
import { useEffect, useState } from 'react';

export type PasswordMeterProps = {
  meter: boolean;
  passwordStrength: number;
  passwordTracker: PasswordTracker;
  passwordMessage: () => string;
  isLabeled: boolean;
  isCompact?: boolean;
  isPasswordRare?: boolean;
};

export const PasswordMeter = ({
  meter,
  passwordStrength,
  passwordTracker,
  passwordMessage,
  isLabeled,
  isCompact,
  isPasswordRare,
}: PasswordMeterProps) => {
  if (!meter) return null;

  const [isHintsOpen, setIsHintsOpen] = useState<null | boolean>(null);

  const message = passwordMessage();
  const title = !passwordTracker.eightCharsOrGreater
    ? 'Minimum length 8 characters'
    : `${message} Password`;

  useEffect(() => {
    if (isMobile) {
      setIsHintsOpen(false);
    }
  }, []);

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
            <header css={styles.header}>
              <p css={styles.title}>{title}</p>
              <button
                onClick={() => setIsHintsOpen(!isHintsOpen)}
                type="button"
                css={[
                  styles.infoButton,
                  !isCompact && !isMobile ? styles.infoButtonHidden : null,
                ]}
              >
                <SvgIcon>
                  <IconInfo />
                </SvgIcon>
              </button>
            </header>
            <div
              css={styles.meter(
                !passwordTracker.eightCharsOrGreater ? 0 : passwordStrength,
              )}
            ></div>
          </div>
          <div
            css={[
              (isCompact || isMobile) && styles.hintsWrapper,
              isHintsOpen && styles.hintsWrapperVisible,
            ]}
          >
            <ul css={styles.hintsContent}>
              <li
                css={[
                  styles.hint,
                  passwordTracker.letters ? styles.hintDisabled : '',
                ]}
              >
                Mixed letters (Aa)
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
                16+ characters
              </li>
              <li
                css={[styles.hint, isPasswordRare ? styles.hintDisabled : '']}
              >
                No common words
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ) : null;
};
