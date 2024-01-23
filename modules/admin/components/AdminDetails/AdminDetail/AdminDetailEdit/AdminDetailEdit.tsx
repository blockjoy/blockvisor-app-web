import { capitalized } from '@modules/admin/utils/capitalized';
import { Button, ButtonGroup } from '@shared/components';
import { KeyboardEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { styles } from './AdminDetailEdit.styles';
import { AdminDetailEditControl } from './AdminDetailEditControl/AdminDetailEditControl';
import { useRouter } from 'next/router';
import isEqual from 'lodash/isEqual';

type Props = {
  properties: AdminDetailProperty[];
  onSaveChanges: (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
  ) => void;
  onToggleEditMode: VoidFunction;
};

export const AdminDetailEdit = ({
  properties,
  onSaveChanges,
  onToggleEditMode,
}: Props) => {
  const router = useRouter();
  const { name } = router.query;

  const [editedProperties, setEditedProperties] = useState(properties);
  const [isSaving, setIsSaving] = useState(false);

  const editedValues = editedProperties.map(
    (property) => property.editSettings?.defaultValue,
  );

  const originalValues = properties.map(
    (property) => property.editSettings?.defaultValue,
  );

  const isDirty = !isEqual(editedValues, originalValues);
  const isValid = editedValues.every((value) => Boolean(value));

  const handleChange = (field: string, value: string) => {
    const propertiesCopy = [...editedProperties];
    const foundProperty = propertiesCopy.find(
      (property) => property.editSettings?.field === field,
    );

    if (!foundProperty || !foundProperty.editSettings) return;

    foundProperty.editSettings.defaultValue = value;
    setEditedProperties(propertiesCopy);
  };

  const handleEnterSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && isValid && isDirty) {
      handleSaveChanges();
    }
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    onSaveChanges(editedProperties, () => {
      onToggleEditMode();
      toast.success('Changes Saved');
      setIsSaving(false);
    });
  };

  return (
    <>
      {editedProperties.map((property) => (
        <div css={styles.row} key={property.id}>
          <div css={styles.label}>
            {capitalized(
              property.editSettings?.displayName! ||
                property.editSettings?.field!,
            )}
          </div>
          <div css={styles.control}>
            <AdminDetailEditControl
              editSettings={property.editSettings!}
              onChange={handleChange}
              onKeyUp={handleEnterSubmit}
            />
          </div>
        </div>
      ))}
      <ButtonGroup>
        <Button
          loading={isSaving}
          disabled={!isDirty || !isValid}
          onClick={handleSaveChanges}
          size="medium"
        >
          Save
        </Button>
        <Button onClick={onToggleEditMode} size="medium" style="basic">
          Cancel
        </Button>
      </ButtonGroup>
    </>
  );
};
