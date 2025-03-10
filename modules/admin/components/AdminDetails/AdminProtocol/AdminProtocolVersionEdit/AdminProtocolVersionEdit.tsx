import { createDropdownValuesFromEnum } from '@modules/admin/utils';
import { Visibility } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import {
  Button,
  ButtonGroup,
  FormLabel,
  Modal,
  Select,
} from '@shared/components';
import { useEffect, useState } from 'react';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { getNameFromEnum } from 'utils/getNameFromEnum';
import { styles } from './AdminProtocolVersionEdit.styles';

type Props = {
  isOpen: boolean;
  isUpdating: boolean;
  selectedVersion: ProtocolVersion | null;
  onUpdate: VoidFunction;
  onSelectVersion: (version: ProtocolVersion) => void;
  onClose: VoidFunction;
};

export const AdminProtocolVersionEdit = ({
  isOpen,
  isUpdating,
  selectedVersion,
  onUpdate,
  onSelectVersion,
  onClose,
}: Props) => {
  const [originalVisibilty, setOriginalVisibility] =
    useState<Visibility | null>(null);

  const handleSelectVisibility = (value: string) => {
    const nextVersion: ProtocolVersion = {
      ...selectedVersion!,
      visibility: +value,
    };
    onSelectVersion(nextVersion);
  };

  const handleClose = () => {
    setOriginalVisibility(null);
    onClose();
  };

  const handleUpdate = () => {
    setOriginalVisibility(selectedVersion?.visibility!);
    onUpdate();
  };

  useEffect(() => {
    if (!originalVisibilty) {
      setOriginalVisibility(selectedVersion?.visibility!);
    }
  }, [selectedVersion?.visibility]);

  return (
    <Modal
      portalId="toggle-version-visibility"
      isOpen={isOpen}
      handleClose={onClose}
      additionalStyles={[styles.modal]}
    >
      <h3 css={styles.modalHeader}>
        {selectedVersion?.semanticVersion}
        {' | '}
        {selectedVersion?.versionKey?.variantKey}
      </h3>

      <FormLabel>Visibility</FormLabel>
      <Select
        buttonStyles={styles.select}
        noBottomMargin
        buttonText={
          <p>
            {selectedVersion
              ? getNameFromEnum(
                  'VISIBILITY_',
                  Visibility,
                  selectedVersion?.visibility!,
                )
              : null}
          </p>
        }
        items={createDropdownValuesFromEnum(Visibility, 'VISIBILITY_').filter(
          (item) => item.name !== 'Development',
        )}
        selectedItem={{
          id: selectedVersion?.visibility?.toString(),
          name: selectedVersion
            ? getNameFromEnum(
                'VISIBILITY_',
                Visibility,
                selectedVersion?.visibility!,
              )
            : undefined,
        }}
        onSelect={handleSelectVisibility}
      />

      <p css={[colors.warning, spacing.bottom.medium, spacing.top.small]}>
        WARNING: Changing version visibility can potentially have harmful side
        effects!
      </p>

      <ButtonGroup type="extended">
        <Button
          disabled={originalVisibilty === selectedVersion?.visibility}
          style="primary"
          onClick={handleUpdate}
          loading={isUpdating}
        >
          Confirm
        </Button>
        <Button style="outline" onClick={handleClose}>
          Cancel
        </Button>
      </ButtonGroup>
    </Modal>
  );
};
