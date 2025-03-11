import { SvgIcon } from '@shared/components';
import { styles } from './ProtocolIcon.styles';

type Props = {
  color?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const ProtocolIcon = ({ color, Icon }: Props) => {
  return (
    <SvgIcon size="64px" additionalStyles={[styles.icon(color)]}>
      {Icon && <Icon />}
    </SvgIcon>
  );
};
