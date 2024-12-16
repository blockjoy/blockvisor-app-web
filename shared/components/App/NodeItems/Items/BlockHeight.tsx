import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { NodeStatusIcon, SvgIcon } from '@shared/components';
import IconBlockHeight from '@public/assets/icons/app/BlockHeight.svg';

type Props = Partial<Pick<Node, 'blockHeight' | 'nodeStatus'>>;

export const BlockHeight = ({ blockHeight, nodeStatus }: Props) => (
  <div css={styles.blockHeight}>
    <SvgIcon isDefaultColor size="14px">
      {blockHeight! > -1 ? (
        <IconBlockHeight />
      ) : (
        <NodeStatusIcon isDefaultColor size="14px" status={1} />
      )}
    </SvgIcon>
    <var>{blockHeight?.toLocaleString('en-US') ?? 'Syncing'}</var>
  </div>
);

const styles = {
  blockHeight: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  `,
};
