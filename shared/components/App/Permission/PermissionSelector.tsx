import { useEffect, useState } from 'react';
import { SerializedStyles } from '@emotion/react';
import { Checkbox, InputLabel } from '@shared/components';
import { styles } from './PermissionSelector.styles';

type Props = {
  name: string;
  value: string[];
  items?: string[];
  inputSize?: InputSize;
  label?: string;
  labelStyles?: SerializedStyles[];
  disabled?: boolean;
  onChange: (items?: string[]) => void;
};

export const PermissionSelector = ({
  name,
  items,
  inputSize,
  label,
  labelStyles,
  disabled,
  onChange,
  value,
}: Props) => {
  const [selectedAll, setSelectedAll] = useState(false);

  useEffect(() => {
    if (items?.length && items.length === value.length) {
      setSelectedAll(true);
    } else if (value.length !== items?.length && selectedAll) {
      setSelectedAll(false);
    }
  }, [value, items]);

  const permissionsGrouped = items?.reduce(
    (acc: Record<string, string[]>, permission) => {
      const group = permission.split('-')[0];

      if (!acc[group]) acc[group] = [];

      acc[group].push(permission);

      return acc;
    },
    {},
  );

  const handleChange = (item: string) => {
    let newValue: string[];

    if (value?.includes(item)) {
      newValue = value?.filter((sel) => sel !== item);
    } else {
      newValue = [...value, item];
    }

    onChange(newValue);
  };

  const handleSelectAll = () => {
    const newValues = selectedAll ? [] : items;

    onChange(newValues);

    setSelectedAll(!selectedAll);
  };

  return (
    <>
      <div css={styles.labelWrapper}>
        {label && (
          <InputLabel
            additionalStyles={labelStyles}
            labelSize={inputSize}
            name={name}
          >
            {label}
          </InputLabel>
        )}
        <Checkbox
          onChange={handleSelectAll}
          id={`${name}-all`}
          name={`${name}-all`}
          checked={selectedAll}
          disabled={disabled}
          additionalStyles={[styles.selectAll]}
        >
          Select All
        </Checkbox>
      </div>
      <div css={styles.container}>
        <div css={styles.wrapper}>
          {Object.keys(permissionsGrouped ?? {})?.map((permissiongGroupKey) => (
            <div
              key={permissiongGroupKey}
              css={styles.group}
              style={{
                gridRowEnd: `span ${
                  permissionsGrouped?.[permissiongGroupKey]?.length! * 2 + 7
                }`,
              }}
            >
              <h3 css={styles.itemTitle}>
                {permissiongGroupKey.replace('-', ' ')}
              </h3>
              <div>
                {permissionsGrouped?.[permissiongGroupKey]?.map(
                  (permission) => (
                    <Checkbox
                      key={permission}
                      id={permission}
                      name={`${name}[]`}
                      checked={value.includes(permission)}
                      onChange={() => handleChange(permission)}
                      value={permission}
                      disabled={disabled}
                    >
                      {permission}
                    </Checkbox>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
