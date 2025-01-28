import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SerializedStyles } from '@emotion/react';
import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import { Dropdown, InputLabel, withSearchDropdown } from '@shared/components';
import { settingsSelectors } from '@modules/settings';

type Props = {
  items: Item[];
  name: string;
  value: string;
  inputSize?: InputSize;
  label?: string;
  labelStyles?: SerializedStyles[];
  tabIndex?: number;
  disabled?: boolean;
  resourceType?: ResourceType;
  onChange: (id?: string) => void;
};

export const ResourceSelector = ({
  items,
  name,
  value,
  inputSize,
  label,
  labelStyles,
  disabled,
  resourceType,
  onChange,
}: Props) => {
  const resourceSerializedParam = JSON.stringify({
    resourceId: value,
    resourceType,
  });

  const resourceName = useRecoilValue(
    settingsSelectors.resourceName(resourceSerializedParam),
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleChange = (resourceItem: Item | null) => {
    if (resourceItem) onChange(resourceItem.id);
    setSelected(resourceItem);
  };

  useEffect(() => {
    setSelected(() => items.find((item) => item.id === value) ?? null);
  }, [value]);

  const ResourceDropdown = useMemo(
    () =>
      withSearchDropdown<Item>(Dropdown, {
        emptyMessage: 'No resources found.',
      }),
    [items],
  );

  const resolvedSelected =
    selected ?? (resourceName ? { id: value, name: resourceName } : null);

  return (
    <div>
      {label && (
        <InputLabel
          additionalStyles={labelStyles}
          labelSize={inputSize}
          name={name}
          disabled={disabled}
        >
          {label}
        </InputLabel>
      )}

      <ResourceDropdown
        items={items}
        selectedItem={resolvedSelected}
        handleSelected={handleChange}
        defaultText={`Select ${label?.toLowerCase()}`}
        isOpen={isOpen}
        handleOpen={handleOpen}
        size="small"
        buttonType="input"
        disabled={disabled}
      />
    </div>
  );
};
