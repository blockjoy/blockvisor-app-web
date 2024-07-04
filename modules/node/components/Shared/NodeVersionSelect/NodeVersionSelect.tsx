import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Dropdown } from '@shared/components';
import { nodeLauncherAtoms } from '@modules/node';
import { authSelectors } from '@modules/auth';
import { ITheme } from 'types/theme';

type NodeVersionSelectProps = {
  versions: BlockchainVersion[];
  onVersionChanged: (version: BlockchainVersion | null) => void;
};

const styles = {
  versionDescription: (theme: ITheme) => css`
    color: rgb(255 255 255 / 56%);
  `,
  buttonText: (theme: ITheme) => css`
    color: ${theme.colorText};
  `,
};

export const NodeVersionSelect = ({
  versions,
  onVersionChanged,
}: NodeVersionSelectProps) => {
  const selectedVersion = useRecoilValue(nodeLauncherAtoms.selectedVersion);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  return (
    <Dropdown
      disabled={!isSuperUser || versions.length < 2}
      items={versions}
      itemKey="version"
      renderButtonText={
        <p css={styles.buttonText}> {selectedVersion?.version}</p>
      }
      renderItem={(item) => (
        <>
          {item.version}
          {isSuperUser && (
            <span css={styles.versionDescription}> {item.description}</span>
          )}
        </>
      )}
      isOpen={isOpen}
      handleOpen={handleOpen}
      handleSelected={onVersionChanged}
      selectedItem={selectedVersion}
    />
  );
};
