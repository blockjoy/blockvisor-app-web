import { SerializedStyles } from '@emotion/react';
import { SvgIcon } from '@shared/components';
import { PropsWithChildren } from 'react';
import { containers } from 'styles/containers.styles';
import { styles } from './ConfigItem.styles';

type Props = {
  title?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  additionalStyles?: SerializedStyles[];
} & PropsWithChildren;

export const ConfigItem = ({
  children,
  title,
  Icon,
  additionalStyles,
}: Props) => {
  return (
    <>
      <div css={styles.header}>
        {Icon && (
          <span css={styles.icon}>
            <SvgIcon>
              <Icon />
            </SvgIcon>
          </span>
        )}
        <h3 css={styles.subtitle}>{title}</h3>
      </div>
      <div css={[containers.medium, additionalStyles && additionalStyles]}>
        {children}
      </div>
    </>
  );
};
