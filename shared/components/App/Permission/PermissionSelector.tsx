import { useRecoilValue } from 'recoil';
import { SerializedStyles } from '@emotion/react';
import { authAtoms } from '@modules/auth';
import { Checkbox, InputLabel } from '@shared/components';
import { PERMISSION_GROUPS } from '@shared/constants/permissions';
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
  const permissions = useRecoilValue(authAtoms.permissions);

  const permissionsGrouped = (items ?? permissions)?.reduce(
    (acc: Record<string, string[]>, permission) => {
      const groupName =
        PERMISSION_GROUPS.find((prefix) => permission.startsWith(prefix)) ||
        'other';

      if (!acc[groupName]) acc[groupName] = [];

      acc[groupName].push(permission);

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

  return (
    <>
      {label && (
        <InputLabel
          additionalStyles={labelStyles}
          labelSize={inputSize}
          name={name}
        >
          {label}
        </InputLabel>
      )}
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
              <div css={styles.item}>
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
