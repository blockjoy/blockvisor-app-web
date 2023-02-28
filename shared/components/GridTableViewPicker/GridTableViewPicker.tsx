import { FC, ReactNode } from 'react';
import { styles } from './GridTableViewPicker.styles';
import IconTable from '@public/assets/icons/table-12.svg';
import IconGrid from '@public/assets/icons/grid-12.svg';

type IconButtonProps = {
  activeListType: string | 'table' | 'grid';
  name: string;
  onClick: VoidFunction;
  icon: ReactNode;
  dataCy?: string;
};

const IconButton: FC<IconButtonProps> = ({
  activeListType,
  name,
  onClick,
  icon,
  dataCy,
}) => (
  <button
    data-cy={dataCy}
    onClick={onClick}
    css={[styles.iconButton]}
    className={activeListType === name ? 'active' : ''}
  >
    {icon}
  </button>
);

type Props = {
  activeListType: string | 'table' | 'grid';
  onChange: (type: string) => void;
};

const gridTableTypes = [
  { name: 'table', icon: <IconTable />, dataCy: 'nodeList-tableView-button' },
  { name: 'grid', icon: <IconGrid />, dataCy: 'nodeList-gridView-button' },
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
        dataCy={type.dataCy}
      />
    ))}
  </div>
);
