import { useGetBlockchains } from '@modules/node';
import { BlockchainIcon, Table, TableSkeleton } from '@shared/components';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { styles } from './NodeLauncherProtocol.styles';
import IconSearch from '@public/assets/icons/search-16.svg';
import { nodeTypeList, blockchainList } from '@shared/constants/lookups';

type Props = {
  onProtocolSelected: (
    blockchainId: string,
    nodeTypeId: string,
    nodeTypeProperties: NodeTypeConfig[],
  ) => void;
  activeBlockchainId: string;
  activeNodeTypeId: string;
};

export const NodeLauncherProtocol: FC<Props> = ({
  onProtocolSelected,
  activeBlockchainId,
  activeNodeTypeId,
}) => {
  const { getBlockchains, blockchains, loading } = useGetBlockchains();

  const [keyword, setKeyword] = useState<string>('');

  const filteredBlockchains = blockchains?.filter((b) =>
    b.name?.toLowerCase().includes(keyword.toLowerCase()),
  );

  const handleKeywordChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    getBlockchains();
  }, []);

  const handleProtocolSelected = (blockchainId: string, nodeTypeId: string) => {
    const blockchainsCopy = [...blockchains];

    const foundActiveNodeType = blockchainsCopy
      ?.find((b) => b.id === blockchainId)
      ?.supported_node_types.find((n: any) => n.id === nodeTypeId);

    onProtocolSelected(
      blockchainId,
      nodeTypeId,
      foundActiveNodeType.properties,
    );
  };

  return (
    <div css={styles.wrapper}>
      <div>
        <div css={styles.searchWrapper}>
          <input
            autoFocus
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
        ) : (
          <>
            {filteredBlockchains?.map((b) => (
              <div
                key={b.id}
                css={[styles.row, styles.rowHover]}
                className={b.id === activeBlockchainId ? 'active row' : 'row'}
              >
                <span css={styles.iconWrapper}>
                  <BlockchainIcon hideTooltip blockchainId={b.id} />
                </span>
                <span css={styles.name}>{b.name}</span>
                <div css={styles.nodeTypeButtons}>
                  {b.supported_node_types.map((type: any) => (
                    <button
                      className={
                        type.id === activeNodeTypeId &&
                        b.id === activeBlockchainId
                          ? 'active'
                          : ''
                      }
                      key={type.id}
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
            {!keyword &&
              blockchainList
                ?.filter(
                  (b) => b.label !== 'Ethereum PoS' && b.label !== 'Helium',
                )
                ?.map((b: any) => (
                  <div key={b.id} css={[styles.row, styles.rowDisabled]}>
                    <span css={styles.iconWrapper}>
                      <BlockchainIcon hideTooltip blockchainId={b.value} />
                    </span>
                    <span css={styles.name}>{b.label}</span>
                  </div>
                ))}
          </>
        )}
      </div>
    </div>
  );
};
