import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { Dropdown } from '@shared/components';
import { nodeLauncherAtoms, nodeLauncherSelectors } from '@modules/node';
import { authSelectors } from '@modules/auth';
import { ITheme } from 'types/theme';

type NodeVariantSelectProps = {
  onChange: (variant: string) => void;
};

const styles = {
  versionDescription: css`
    color: rgb(255 255 255 / 56%);
  `,
  buttonText: (theme: ITheme) => css`
    color: ${theme.colorText};
  `,
};

export const NodeVariantSelect = ({ onChange }: NodeVariantSelectProps) => {
  const selectedProtocol = useRecoilValue(nodeLauncherAtoms.selectedProtocol);
  const variants = useRecoilValue(nodeLauncherAtoms.variants);
  const selectedVariant = useRecoilValue(nodeLauncherAtoms.selectedVariant);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleSelect = (variant: string) => onChange(variant);

  return (
    <Dropdown
      disabled={!isSuperUser || variants?.length! < 2}
      items={
        variants?.map((variant) => ({
          id: variant,
          name: variant,
        }))!
      }
      itemKey="version"
      {...(selectedProtocol
        ? {
            renderButtonText: <p css={styles.buttonText}>{selectedVariant}</p>,
          }
        : isSuperUser
        ? { error: 'No Versions Available' }
        : { defaultText: <p css={styles.buttonText}>Auto select</p> })}
      renderItem={(item) => <>{item.name}</>}
      isOpen={isOpen}
      handleOpen={handleOpen}
      handleSelected={(item: {
        id?: string | undefined;
        name?: string | undefined;
      }) => handleSelect(item.id!)}
      selectedItem={{
        id: selectedVariant!,
        name: selectedVariant!,
      }}
    />
  );
};
