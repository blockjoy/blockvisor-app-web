import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { Dropdown } from '@shared/components';
import { nodeLauncherAtoms, nodeLauncherSelectors } from '@modules/node';
import { authSelectors } from '@modules/auth';
import { ITheme } from 'types/theme';

type NodeVersionSelectProps = {
  onVersionChanged: (version: ProtocolVersion | null) => void;
};

const styles = {
  versionDescription: css`
    color: rgb(255 255 255 / 56%);
  `,
  buttonText: (theme: ITheme) => css`
    color: ${theme.colorText};
  `,
};

export const NodeVersionSelect = ({
  onVersionChanged,
}: NodeVersionSelectProps) => {
  const selectedProtocol = useRecoilValue(nodeLauncherAtoms.selectedProtocol);
  const selectedVersion = useRecoilValue(nodeLauncherAtoms.selectedVersion);

  const { versions } = selectedProtocol!;

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleSelect = (protocolVersionId: string) => {
    const currentVersion = versions.find(
      (version) => version.protocolVersionId,
    )!;
    onVersionChanged(currentVersion);
  };

  return (
    <Dropdown
      disabled={!isSuperUser || versions.length < 2}
      items={versions.map((version) => ({
        id: version.protocolVersionId,
        name: version.semanticVersion,
      }))}
      itemKey="version"
      {...(selectedProtocol
        ? {
            renderButtonText: (
              <p css={styles.buttonText}>{selectedVersion?.semanticVersion}</p>
            ),
          }
        : isSuperUser
        ? { error: 'No Versions Available' }
        : { defaultText: <p css={styles.buttonText}>Auto select</p> })}
      renderItem={(item) => (
        <>
          {item.name}
          {isSuperUser && (
            <span css={styles.versionDescription}> {item.name}</span>
          )}
        </>
      )}
      isOpen={isOpen}
      handleOpen={handleOpen}
      handleSelected={(item: {
        id?: string | undefined;
        name?: string | undefined;
      }) => handleSelect(item.id!)}
      selectedItem={{
        id: selectedVersion?.protocolVersionId,
        name: selectedVersion?.semanticVersion,
      }}
    />
  );
};
