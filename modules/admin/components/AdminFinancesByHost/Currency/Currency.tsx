import { styles } from './Currency.styles';

import IconTrendingUp from '@public/assets/icons/common/TrendingUp.svg';
import IconTrendingDown from '@public/assets/icons/common/TrendingDown.svg';
import { SvgIcon } from '../../../../../shared/components/General/SvgIcon/SvgIcon';

type Props = {
  cents?: number;
  hasColor?: boolean;
  hasIcon?: boolean;
  isShort?: boolean;
};

export const Currency = ({ cents, hasColor, hasIcon, isShort }: Props) => {
  let numFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const shortVersion = (num: number) => {
    const abs: number = Math.abs(num);
    return abs > 999
      ? ((Math.sign(num) * abs) / 1000).toFixed(1) + 'k'
      : (Math.sign(num) * abs).toFixed(1);
  };

  return (
    <p
      css={[
        styles.wrapper,
        !hasColor
          ? null
          : cents! > 0
          ? styles.positive
          : cents! < 0
          ? styles.negative
          : null,
      ]}
    >
      {cents !== undefined
        ? isShort
          ? shortVersion(cents / 100)
          : numFormatter.format(cents / 100)
        : '-'}
      {hasIcon && (
        <SvgIcon>
          {hasIcon && cents! > 0 && <IconTrendingUp />}
          {hasIcon && cents! < 0 && <IconTrendingDown />}
        </SvgIcon>
      )}
    </p>
  );
};
