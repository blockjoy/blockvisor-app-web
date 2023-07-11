import { css, keyframes } from '@emotion/react';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { SvgIcon } from '@shared/components/General';

const spin = keyframes`
    100% {
        transform: rotate(1turn);
    }
`;

const styles = {
  wrapper: css`
    display: inline-block;
    animation: ${spin} 1.2s infinite linear;
  `,
};

type Props = {
  size: string;
};

const NodeStatusSpinner = ({ size }: Props) => (
  <div css={styles.wrapper}>
    <SvgIcon isDefaultColor size={size}>
      <IconCog />
    </SvgIcon>
  </div>
);

export default NodeStatusSpinner;
