import { useEffect, useMemo, useState } from 'react';
import { SerializedStyles } from '@emotion/react';
import { Dropdown, InputLabel, withSearchDropdown } from '@shared/components';

type Props = {
  items: Item[];
  name: string;
  value: string;
  inputSize?: InputSize;
  label?: string;
  labelStyles?: SerializedStyles[];
  tabIndex?: number;
  disabled?: boolean;
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
  onChange,
}: Props) => {
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
        selectedItem={selected}
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
