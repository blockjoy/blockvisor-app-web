import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { Dropdown, sort } from '@shared/components';
import { nodeLauncherAtoms } from '@modules/node';
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
  const variants = useRecoilValue(nodeLauncherAtoms.variants);

  const selectedVariant = useRecoilValue(nodeLauncherAtoms.selectedVariant);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleSelect = (variant: string) => onChange(variant);

  return (
    <Dropdown
      disabled={!isSuperUser || variants?.length! < 2}
      items={sort(
        variants?.map((variant) => ({
          id: variant,
          name: variant,
        }))!,
        { field: 'name' },
      )}
      itemKey="version"
      {...(selectedVariant?.variantKey
        ? {
            renderButtonText: (
              <p css={styles.buttonText}>{selectedVariant.variantKey}</p>
            ),
          }
        : isSuperUser
        ? { error: 'No Variants Available' }
        : { defaultText: <p css={styles.buttonText}>Auto select</p> })}
      renderItem={(item) => <>{item.name}</>}
      isOpen={isOpen}
      handleOpen={handleOpen}
      handleSelected={(item: {
        id?: string | undefined;
        name?: string | undefined;
      }) => handleSelect(item.id!)}
      selectedItem={{
        id: selectedVariant?.variantKey,
        name: selectedVariant?.variantKey,
      }}
    />
  );
};
