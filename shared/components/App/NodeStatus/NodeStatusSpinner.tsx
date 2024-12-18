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
  protocolStatus?: string;
  isDefaultColor?: boolean;
};

const NodeStatusSpinner = ({
  size,
  status,
  protocolStatus,
  isDefaultColor,
}: Props) => (
  <div css={styles.wrapper}>
    <SvgIcon
      additionalStyles={[
        getNodeStatusColor(
          isDefaultColor ? -1 : status,
          undefined,
          protocolStatus,
        ),
      ]}
      isDefaultColor={isDefaultColor}
      size={size}
    >
      <IconCog />
    </SvgIcon>
  </div>
);

export default NodeStatusSpinner;
