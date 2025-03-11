import { PropsWithChildren } from 'react';
import { styles } from './ConfigItemContent.styles';

type Props = {
  isActive?: boolean;
  isDisabled?: boolean;
  handleClick?: VoidFunction;
} & PropsWithChildren;

export const ConfigItemContent = ({
  children,
  isActive,
  isDisabled,
  handleClick,
}: Props) => {
  return (
    <div
      css={[
        styles.item,
        isActive && styles.itemActive,
        isDisabled && styles.itemDisabled,
      ]}
      {...(!isDisabled && { onClick: handleClick })}
    >
      {children}
    </div>
  );
};
