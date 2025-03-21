import { useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { Dropdown } from '@shared/components';
import {
  nodeLauncherAtoms,
  nodeLauncherSelectors,
  sortVersions,
} from '@modules/node';
import { authSelectors } from '@modules/auth';
import { ITheme } from 'types/theme';
import { Visibility } from '@modules/grpc/library/blockjoy/common/v1/protocol';

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
  const selectedVariant = useRecoilValue(nodeLauncherAtoms.selectedVariant);

  const versions = useRecoilValue(nodeLauncherAtoms.versions);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const isVariantValid = useRecoilValue(nodeLauncherSelectors.isVariantValid);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleSelect = useRecoilCallback(
    ({ snapshot }) =>
      async (protocolVersionId: string) => {
        const versionsRecoilState = await snapshot.getPromise(
          nodeLauncherAtoms.versions,
        );
        onVersionChanged(
          versionsRecoilState?.find(
            (v) => v.protocolVersionId === protocolVersionId,
          )!,
        );
      },
    [versions],
  );

  const items = sortVersions(
    versions?.filter(
      (version) => version.visibility === Visibility.VISIBILITY_PUBLIC,
    )!,
  ).map((version) => ({
    id: version.protocolVersionId,
    name: isSuperUser
      ? `${version.semanticVersion} - ${version.description}`
      : version.semanticVersion,
  }));

  return (
    <Dropdown
      disabled={
        versions?.length! < 2 ||
        !selectedVersion ||
        (!isVariantValid && !selectedVariant)
      }
      items={items}
      {...(selectedVersion || isVariantValid
        ? {
            renderButtonText: (
              <p css={styles.buttonText}>{selectedVersion?.semanticVersion}</p>
            ),
          }
        : isSuperUser
        ? {
            error:
              !isVariantValid && !selectedVariant
                ? 'No Variant Selected'
                : 'No Versions Available',
          }
        : { defaultText: <>Auto select</> })}
      renderItem={(item) => item.name}
      isOpen={isOpen}
      isLoading={isSuperUser && isVariantValid && !selectedVersion}
      handleOpen={handleOpen}
      handleSelected={(item: {
        id?: string | undefined;
        name?: string | undefined;
      }) => handleSelect(item.id!)}
      selectedItem={
        selectedVersion
          ? {
              id: selectedVersion?.protocolVersionId,
              name: selectedVersion?.semanticVersion,
            }
          : null
      }
    />
  );
};
