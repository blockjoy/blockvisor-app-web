import { PasswordTracker } from '@modules/auth/hooks/usePasswordStrength';
import { SvgIcon } from '@shared/components';
import { isMobile } from 'react-device-detect';
import IconInfo from '@public/assets/icons/common/Info.svg';
import { styles } from './PasswordMeter.styles';
import { useLayoutEffect, useRef, useState } from 'react';

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

  const hintsRef = useRef<HTMLUListElement>(null);

  const hintsClientHeight = useRef<number>(0);

  const [hintsHeight, setHintsHeight] = useState<number | undefined>();

  const message = passwordMessage();
  const title = !passwordTracker.eightCharsOrGreater
    ? 'Minimum length 8 characters'
    : `${message} Password`;

  const toggleHints = () => {
    if (hintsHeight === 0) {
      setHintsHeight(hintsClientHeight.current);
    } else {
      setHintsHeight(0);
    }
  };

  useLayoutEffect(() => {
    hintsClientHeight.current = hintsRef.current?.clientHeight!;
    if (isMobile || isCompact) {
      setHintsHeight(0);
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
                onClick={toggleHints}
                type="button"
                css={[
                  styles.infoButton,
                  !isCompact && !isMobile ? styles.infoButtonHidden : null,
                ]}
              >
                <SvgIcon isDefaultColor>
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
            css={[(isCompact || isMobile) && styles.hintsWrapper]}
            style={{ height: `${hintsHeight}px` }}
          >
            <ul ref={hintsRef} css={styles.hintsContent}>
              <li
                css={[
                  styles.hint,
                  passwordTracker.letters ? styles.hintDisabled : '',
                ]}
              >
                Letters (Aa)
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
                16+ Characters
              </li>
              <li
                css={[styles.hint, isPasswordRare ? styles.hintDisabled : '']}
              >
                Unique Password
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ) : null;
};
