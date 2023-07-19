import { useGetBlockchains } from '@modules/node';
import { TableSkeleton, Scrollbar } from '@shared/components';
import { ChangeEvent, FC, useState } from 'react';
import { styles } from './NodeLauncherProtocol.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { NodeProperty, NodeType } from '@modules/grpc/library/blockjoy/v1/node';
import IconSearch from '@public/assets/icons/common/Search.svg';
import { NodeLauncherProtocolBlockchains } from './NodeLauncherProtocolBlockchains';
import { isMobile } from 'react-device-detect';

type Props = {
  onProtocolSelected: (
    blockchainId: string,
    nodeTypeId: NodeType,
    nodeTypeProperties: NodeProperty[],
    nodeVersion: string,
  ) => void;
  blockchainId: string;
  nodeType: NodeType;
};

export const NodeLauncherProtocol: FC<Props> = ({
  onProtocolSelected,
  blockchainId,
  nodeType,
}) => {
  const { blockchains, loading } = useGetBlockchains();

  const [keyword, setKeyword] = useState<string>('');

  const handleKeywordChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const BlockchainsComponent = () => (
    <NodeLauncherProtocolBlockchains
      onProtocolSelected={onProtocolSelected}
      activeBlockchainId={blockchainId}
      activeNodeType={nodeType}
      keyword={keyword}
    />
  );

  return (
    <div css={styles.wrapper}>
      <>
        <div css={styles.searchWrapper}>
          <input
            tabIndex={1}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            css={styles.searchBox}
            type="text"
            placeholder="Find a Protocol"
            onChange={handleKeywordChanged}
          />
          <span css={styles.searchIcon}>
            <IconSearch />
          </span>
        </div>
        {loading ? (
          <div css={styles.skeletonWrapper}>
            <TableSkeleton />
          </div>
        ) : !Boolean(blockchains?.length) ? (
          <div
            css={[typo.small, colors.warning]}
            style={{ marginLeft: '16px' }}
          >
            Error loading data, please contact our support team.
          </div>
        ) : isMobile ? (
          <BlockchainsComponent />
        ) : (
          <Scrollbar additionalStyles={[styles.scrollbar]}>
            <BlockchainsComponent />
          </Scrollbar>
        )}
      </>
    </div>
  );
};
