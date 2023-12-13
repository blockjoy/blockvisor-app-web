import { useRecoilValue } from 'recoil';
import { ChangeEvent, useState } from 'react';
import { isMobile } from 'react-device-detect';
import IconSearch from '@public/assets/icons/common/Search.svg';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { TableSkeleton, Scrollbar } from '@shared/components';
import { blockchainAtoms } from '@modules/node';
import { styles } from './NodeLauncherProtocol.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { NodeLauncherProtocolBlockchains } from './NodeLauncherProtocolBlockchains';

type NodeLauncherProtocolProps = {
  onProtocolSelected: (blockchainId: string, nodeTypeId: NodeType) => void;
};

export const NodeLauncherProtocol = ({
  onProtocolSelected,
}: NodeLauncherProtocolProps) => {
  const blockchains = useRecoilValue(blockchainAtoms.blockchains);
  const loadingState = useRecoilValue(blockchainAtoms.blockchainsLoadingState);

  const [keyword, setKeyword] = useState('');

  const handleKeywordChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const BlockchainsComponent = () => (
    <NodeLauncherProtocolBlockchains
      onProtocolSelected={onProtocolSelected}
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
        {loadingState !== 'finished' ? (
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
