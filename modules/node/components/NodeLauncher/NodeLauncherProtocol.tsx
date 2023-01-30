import { useGetBlockchains } from '@modules/node';
import { BlockchainIcon, TableSkeleton } from '@shared/components';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { styles } from './NodeLauncherProtocol.styles';
import IconSearch from '@public/assets/icons/search-16.svg';
import { nodeTypeList } from '@shared/constants/lookups';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { blockchainsDisabled } from '@shared/constants/lookups';

type Props = {
  onProtocolSelected: (
    blockchainId: string,
    nodeTypeId: string,
    nodeTypeProperties: NodeTypeConfig[],
    nodeVersion: string,
  ) => void;
  activeBlockchainId: string;
  activeNodeTypeId: string;
};

export const NodeLauncherProtocol: FC<Props> = ({
  onProtocolSelected,
  activeBlockchainId,
  activeNodeTypeId,
}) => {
  const { blockchains, loading } = useGetBlockchains();

  const [keyword, setKeyword] = useState<string>('');

  const filteredBlockchains = blockchains?.filter(
    (b) =>
      b.status !== 0 && b.name?.toLowerCase().includes(keyword.toLowerCase()),
  );

  const handleKeywordChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  console.log('loading', loading);

  const handleProtocolSelected = (blockchainId: string, nodeTypeId: string) => {
    const blockchainsCopy = [...blockchains];

    const foundActiveNodeType = blockchainsCopy
      ?.find((b) => b.id === blockchainId)
      ?.supported_node_types.find((n: any) => n.id === nodeTypeId);

    onProtocolSelected(
      blockchainId,
      nodeTypeId,
      foundActiveNodeType.properties,
      foundActiveNodeType.version,
    );
  };

  return (
    <div css={styles.wrapper}>
      <div>
        <div css={styles.searchWrapper}>
          <input
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
        ) : (
          <>
            {filteredBlockchains?.map((b) => (
              <div
                key={b.id}
                css={[styles.row, styles.rowHover]}
                className={b.id === activeBlockchainId ? 'active row' : 'row'}
              >
                <span css={styles.blockchainWrapper}>
                  <span css={styles.iconWrapper}>
                    <BlockchainIcon hideTooltip blockchainName={b.name} />
                  </span>
                  <span css={styles.name}>
                    <span className="beta-badge" css={styles.betaBadge}>
                      BETA
                    </span>
                    {b.name}
                  </span>
                </span>
                <div css={styles.nodeTypeButtons} className="node-type-buttons">
                  {b.supported_node_types.map((type: any) => (
                    <button
                      key={type.id}
                      className={
                        type.id === activeNodeTypeId &&
                        b.id === activeBlockchainId
                          ? 'active'
                          : ''
                      }
                      onClick={() => handleProtocolSelected(b.id!, type.id)}
                      type="button"
                      css={styles.createButton}
                    >
                      {nodeTypeList.find((n) => n.id === type.id)?.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div css={styles.disabledBlockchains}>
              {!keyword &&
                blockchainsDisabled?.map((b: any) => (
                  <div key={b} css={[styles.row, styles.rowDisabled]}>
                    <span css={styles.blockchainWrapper}>
                      <span css={styles.iconWrapper}>
                        <BlockchainIcon hideTooltip blockchainName={b} />
                      </span>
                      <span css={styles.name}>{b}</span>
                      <span
                        className="coming-soon-badge"
                        css={styles.comingSoonBadge}
                      >
                        Coming Soon
                      </span>
                    </span>
                  </div>
                ))}
            </div>
            {/* {!keyword &&
              disabledBlockchains
                ?.filter(
                  (b) => b.name !== 'Ethereum PoS' && b.name !== 'Helium',
                )
                ?.map((b: any) => (
                  <div key={b.id} css={[styles.row, styles.rowDisabled]}>
                    <span css={styles.blockchainWrapper}>
                      <span css={styles.iconWrapper}>
                        <BlockchainIcon hideTooltip blockchainName={b.name} />
                      </span>
                      <span css={styles.name}>{b.name}</span>
                    </span>
                  </div>
                ))} */}
          </>
        )}
      </div>
    </div>
  );
};
