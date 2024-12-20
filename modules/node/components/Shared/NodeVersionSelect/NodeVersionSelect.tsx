import { useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { Dropdown } from '@shared/components';
import { nodeLauncherAtoms, sortVersions } from '@modules/node';
import { authSelectors } from '@modules/auth';
import { ITheme } from 'types/theme';

type NodeVersionSelectProps = {
  onVersionChanged: (version: ProtocolVersion) => void;
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
  const selectedVersion = useRecoilValue(nodeLauncherAtoms.selectedVersion);

  const versions = useRecoilValue(nodeLauncherAtoms.versions);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleSelect = useRecoilCallback(
    ({ snapshot }) =>
      async (protocolVersionId: string) => {
        const versionsRecoilState = await snapshot.getPromise(
          nodeLauncherAtoms.versions,
        );
        onVersionChanged(
          versionsRecoilState.find(
            (v) => v.protocolVersionId === protocolVersionId,
          )!,
        );
      },
    [versions],
  );

  return (
    <Dropdown
      disabled={!isSuperUser || versions.length < 2}
      items={sortVersions(versions).map((version) => ({
        id: version.protocolVersionId,
        name: isSuperUser
          ? `${version.semanticVersion} - ${version.description}`
          : version.semanticVersion,
      }))}
      {...(selectedVersion
        ? {
            renderButtonText: (
              <p css={styles.buttonText}>{selectedVersion?.semanticVersion}</p>
            ),
          }
        : isSuperUser
        ? { error: 'No Versions Available' }
        : { defaultText: <p css={styles.buttonText}>Auto select</p> })}
      renderItem={(item) => item.name}
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
