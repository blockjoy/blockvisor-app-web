import { styles } from './GridTableViewPicker.styles';
import { SvgIcon } from '@shared/components/General';
import IconTable from '@public/assets/icons/common/Table.svg';
import IconGrid from '@public/assets/icons/common/Grid.svg';

type IconButtonProps = {
  activeListType: string | 'table' | 'grid';
  name: string;
  onClick: VoidFunction;
  icon: React.ReactNode;
};

const IconButton = ({
  activeListType,
  name,
  onClick,
  icon,
}: IconButtonProps) => (
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

export const GridTableViewPicker = ({ activeListType, onChange }: Props) => (
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
