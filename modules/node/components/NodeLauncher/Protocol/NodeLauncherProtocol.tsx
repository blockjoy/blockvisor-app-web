import { useGetBlockchains } from '@modules/node';
import { BlockchainIcon, TableSkeleton, EmptyColumn } from '@shared/components';
import { ChangeEvent, FC, useState } from 'react';
import { styles } from './NodeLauncherProtocol.styles';
import { nodeTypeList } from '@shared/constants/lookups';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { blockchainsDisabled } from '@shared/constants/lookups';
import { NodeProperty, NodeType } from '@modules/grpc/library/blockjoy/v1/node';
import { SupportedNodeType } from '@modules/grpc/library/blockjoy/v1/blockchain';
import IconSearch from '@public/assets/icons/search-16.svg';

type Props = {
  onProtocolSelected: (
    blockchainId: string,
    nodeTypeId: NodeType,
    nodeTypeProperties: NodeProperty[],
    nodeVersion: string,
  ) => void;
  activeBlockchainId: string;
  activeNodeTypeId: NodeType;
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

  const handleProtocolSelected = (
    blockchainId: string,
    nodeTypeId: NodeType,
  ) => {
    const blockchainsCopy = [...blockchains];

    const foundActiveNodeType = blockchainsCopy?.find(
      (b) => b.id === blockchainId,
    );

    const foundActiveSupportedNodeType = foundActiveNodeType?.nodesTypes!.find(
      (n: SupportedNodeType) => n.nodeType === nodeTypeId,
    );

    onProtocolSelected(
      blockchainId,
      nodeTypeId,
      foundActiveSupportedNodeType?.properties.map((property) => ({
        name: property.name,
        uiType: property.uiType,
        disabled: property.disabled,
        required: property.required,
        value: property.default ?? '',
      }))!,
      foundActiveSupportedNodeType?.version!,
    );
  };

  return (
    <div css={styles.wrapper}>
      <div>
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
        ) : (
          <>
            {!filteredBlockchains?.length ? (
              <EmptyColumn
                title="No Blockchains."
                description="Please refine your search."
              />
            ) : (
              filteredBlockchains?.map((b, index) => (
                <div
                  tabIndex={activeNodeTypeId ? -1 : index + 1}
                  key={b.id}
                  css={[styles.row, styles.rowHover]}
                  className={b.id === activeBlockchainId ? 'active row' : 'row'}
                >
                  <span css={styles.blockchainWrapper}>
                    <BlockchainIcon
                      size="28px"
                      hideTooltip
                      blockchainName={b.name}
                    />
                    <span css={styles.name}>
                      <span className="beta-badge" css={styles.betaBadge}>
                        BETA
                      </span>
                      {b.name}
                    </span>
                  </span>
                  <div
                    css={styles.nodeTypeButtons}
                    className="node-type-buttons"
                  >
                    {b.nodesTypes.map((type: SupportedNodeType) => (
                      <button
                        tabIndex={activeNodeTypeId ? -1 : index + 1}
                        key={type.nodeType}
                        className={
                          type.nodeType === activeNodeTypeId &&
                          b.id === activeBlockchainId
                            ? 'active'
                            : ''
                        }
                        onClick={() =>
                          handleProtocolSelected(b.id!, type.nodeType)
                        }
                        type="button"
                        css={styles.createButton}
                      >
                        {nodeTypeList.find((n) => n.id === type.nodeType)?.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
            <div css={styles.disabledBlockchains}>
              {!keyword &&
                blockchainsDisabled
                  ?.filter(
                    (b: any) => !blockchains?.some((c: any) => b === c.name),
                  )
                  ?.map((b: any) => (
                    <div key={b} css={[styles.row, styles.rowDisabled]}>
                      <span css={styles.blockchainWrapper}>
                        <BlockchainIcon
                          size="28px"
                          hideTooltip
                          blockchainName={b}
                        />
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
          </>
        )}
      </div>
    </div>
  );
};
