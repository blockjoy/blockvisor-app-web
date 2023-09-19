import { css, keyframes } from '@emotion/react';
import IconCog from '@public/assets/icons/common/Cog.svg';
import { SvgIcon } from '@shared/components/General';
import { getNodeStatusColor } from './NodeStatus';

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
  status: number;
};

const NodeStatusSpinner = ({ size, status }: Props) => (
  <div css={styles.wrapper}>
    <SvgIcon additionalStyles={[getNodeStatusColor(status)]} size={size}>
      <IconCog />
    </SvgIcon>
  </div>
);

export default NodeStatusSpinner;
