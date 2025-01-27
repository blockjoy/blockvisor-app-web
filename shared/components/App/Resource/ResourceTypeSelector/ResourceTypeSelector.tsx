import { useEffect, useState } from 'react';
import { SerializedStyles } from '@emotion/react';
import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import { Dropdown, InputLabel } from '@shared/components';
import { RESOURCE_TYPE_ITEMS } from '@shared/index';

type ResourceItem = Item & { value?: ResourceType };

type Props = {
  name: string;
  value: ResourceType;
  inputSize?: InputSize;
  label?: string;
  labelStyles?: SerializedStyles[];
  tabIndex?: number;
  disabled?: boolean;
  onChange: (id?: ResourceType) => void;
};

export const ResourceTypeSelector = ({
  name,
  value,
  inputSize,
  label,
  labelStyles,
  disabled,
  onChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ResourceItem | null>(null);

  const handleOpen = (open: boolean = true) => setIsOpen(open);

  const handleChange = (resourceType: ResourceItem | null) => {
    if (resourceType) onChange(resourceType.value);
    setSelected(resourceType);
  };

  useEffect(() => {
    setSelected(
      value === ResourceType.RESOURCE_TYPE_UNSPECIFIED
        ? null
        : RESOURCE_TYPE_ITEMS.find((input) => input.value === value) ?? null,
    );
  }, [value]);

  return (
    <div>
      {label && (
        <InputLabel
          name={name}
          additionalStyles={labelStyles}
          labelSize={inputSize}
        >
          {label}
        </InputLabel>
      )}

      <Dropdown
        items={RESOURCE_TYPE_ITEMS}
        selectedItem={selected}
        handleSelected={handleChange}
        defaultText="Select Resource type"
        isOpen={isOpen}
        handleOpen={handleOpen}
        size="small"
        buttonType="input"
        disabled={disabled}
      />
    </div>
  );
};
