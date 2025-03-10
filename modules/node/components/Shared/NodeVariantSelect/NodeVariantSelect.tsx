import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { Dropdown, sort } from '@shared/components';
import { nodeLauncherAtoms } from '@modules/node';
import { authSelectors } from '@modules/auth';
import { ITheme } from 'types/theme';

type NodeVariantSelectProps = {
  onVariantChanged: (variant: string) => void;
};

const styles = {
  versionDescription: css`
    color: rgb(255 255 255 / 56%);
  `,
  buttonText: (theme: ITheme) => css`
    color: ${theme.colorText};
  `,
};

export const NodeVariantSelect = ({
  onVariantChanged,
}: NodeVariantSelectProps) => {
  const variants = useRecoilValue(nodeLauncherAtoms.variants);

  const selectedVariant = useRecoilValue(nodeLauncherAtoms.selectedVariant);

  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleSelect = (variant: string) => onVariantChanged(variant);

  const items = sort(
    variants?.map((variant) => ({
      id: variant,
      name: variant,
    })) ?? [],
    { field: 'name' },
  );

  const error = !variants?.length ? 'No Variants Available' : '';

  return (
    <Dropdown
      disabled={!!error}
      items={items}
      itemKey="version"
      {...(selectedVariant?.variantKey
        ? {
            renderButtonText: (
              <p css={styles.buttonText}>{selectedVariant.variantKey}</p>
            ),
          }
        : isSuperUser
        ? { error }
        : { defaultText: <>Auto select</> })}
      renderItem={(item) => <>{item.name}</>}
      isOpen={isOpen}
      isLoading={!variants}
      handleOpen={handleOpen}
      handleSelected={(item: {
        id?: string | undefined;
        name?: string | undefined;
      }) => handleSelect(item.id!)}
      selectedItem={
        selectedVariant?.variantKey
          ? {
              id: selectedVariant?.variantKey,
              name: selectedVariant?.variantKey,
            }
          : null
      }
    />
  );
};
