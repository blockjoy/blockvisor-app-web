import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { BlockchainVersion } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Dropdown } from '@shared/components';
import { nodeLauncherAtoms, nodeLauncherSelectors } from '@modules/node';
import { authSelectors } from '@modules/auth';
import { ITheme } from 'types/theme';

type NodeVersionSelectProps = {
  onVersionChanged: (version: BlockchainVersion | null) => void;
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
  const versions = useRecoilValue(nodeLauncherSelectors.versions);
  const selectedVersion = useRecoilValue(nodeLauncherAtoms.selectedVersion);
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  return (
    <Dropdown
      disabled={!isSuperUser || versions.length < 2}
      items={versions}
      itemKey="version"
      {...(selectedVersion
        ? {
            renderButtonText: (
              <p css={styles.buttonText}>{selectedVersion?.version}</p>
            ),
          }
        : isSuperUser
        ? { error: 'No Versions Available' }
        : { defaultText: <p css={styles.buttonText}>Auto select</p> })}
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
