import { FC, ReactNode } from 'react';
import { styles } from './GridTableViewPicker.styles';
import IconTable from '@public/assets/icons/common/Table.svg';
import IconGrid from '@public/assets/icons/common/Grid.svg';
import { SvgIcon } from '@shared/components/General';

type IconButtonProps = {
  activeListType: string | 'table' | 'grid';
  name: string;
  onClick: VoidFunction;
  icon: ReactNode;
};

const IconButton: FC<IconButtonProps> = ({
  activeListType,
  name,
  onClick,
  icon,
}) => (
  <button
    onClick={onClick}
    css={[styles.iconButton]}
    className={activeListType === name ? 'active' : ''}
  >
    <SvgIcon size="14px">{icon}</SvgIcon>
  </button>
);

type Props = {
  activeListType: string | 'table' | 'grid';
  onChange: (type: string) => void;
};

const gridTableTypes = [
  { name: 'table', icon: <IconTable /> },
  { name: 'grid', icon: <IconGrid /> },
];

export const GridTableViewPicker: FC<Props> = ({
  activeListType,
  onChange,
}) => (
  <div css={[styles.listTypePicker]}>
    {gridTableTypes.map((type) => (
      <IconButton
        key={type.name}
        name={type.name}
        onClick={() => onChange(type.name)}
        icon={type.icon}
        activeListType={activeListType}
      />
    ))}
  </div>
);
