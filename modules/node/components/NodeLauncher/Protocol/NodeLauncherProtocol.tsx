import { useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';
import {
  ProtocolIcon,
  List,
  EmptyColumn,
  withSearchList,
} from '@shared/components';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { protocolAtoms, nodeLauncherAtoms } from '@modules/node';
import { styles } from './NodeLauncherProtocol.styles';
import { capitalize } from 'utils/capitalize';

type NodeLauncherProtocolProps = {
  onProtocolSelected: (protocol: Protocol) => void;
};

export const NodeLauncherProtocol = ({
  onProtocolSelected,
}: NodeLauncherProtocolProps) => {
  const nodeLauncher = useRecoilValue(nodeLauncherAtoms.nodeLauncher);
  const protocols = useRecoilValue(protocolAtoms.protocols);
  const loadingState = useRecoilValue(protocolAtoms.protocolsLoadingState);
  const selectedProtocol = useRecoilValue(nodeLauncherAtoms.selectedProtocol);

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback((focus: boolean) => {
    setIsFocused(focus);
  }, []);

  const activeProtocolId = selectedProtocol?.protocolId;

  const handleSelect = useCallback(
    (activeProtocol: Protocol) => {
      onProtocolSelected(activeProtocol);
    },
    [onProtocolSelected],
  );

  const handleProtocolSelected = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
      protocol: Protocol,
    ) => {
      e.preventDefault();
      e.stopPropagation();
      handleSelect(protocol);
    },
    [handleSelect],
  );

  // Protocol component to show in the list
  const renderItem = (protocol: Protocol, isFocusedItem?: boolean) => {
    const isActiveItem = protocol.protocolId === activeProtocolId;

    return (
      <div
        css={[styles.row, styles.rowHover]}
        className={`row list-item${isActiveItem ? ' active' : ''}${
          isFocusedItem ? ' focus' : ''
        }`}
        onClick={(e) => handleProtocolSelected(e, protocol)}
      >
        <ProtocolIcon size="28px" hideTooltip protocolName={protocol.name} />
        <p>{capitalize(protocol.name)}</p>
      </div>
    );
  };

  // Empty component to show when there are no protocols
  const renderEmpty = () => (
    <EmptyColumn
      title="No Protocols."
      description="Please refine your search."
    />
  );

  const ProtocolsList = useMemo(
    () => withSearchList<Protocol>(List),
    [protocols],
  );

  return (
    <div css={styles.wrapper}>
      {!protocols?.length && loadingState === 'finished' ? (
        <div css={[typo.small, colors.warning]} style={{ marginLeft: '16px' }}>
          Error loading data, please contact our support team.
        </div>
      ) : (
        <ProtocolsList
          items={protocols.map((protocol) => ({
            ...protocol,
            id: protocol.protocolId,
          }))}
          selectedItem={selectedProtocol}
          renderItem={renderItem}
          renderEmpty={renderEmpty}
          handleSelect={handleSelect}
          searchPlaceholder="Find a Protocol"
          isFocused={isFocused}
          handleFocus={handleFocus}
          isLoading={loadingState !== 'finished'}
          additionalyStyles={styles.scrollbar}
        />
      )}
    </div>
  );
};
