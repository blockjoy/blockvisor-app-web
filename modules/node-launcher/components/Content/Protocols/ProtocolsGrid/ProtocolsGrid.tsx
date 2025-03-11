import { useRecoilValue } from 'recoil';
import { layoutSelectors } from '@modules/layout';
import { styles } from './ProtocolsGrid.styles';

type Props = {
  gridRef: React.RefObject<HTMLDivElement>;
} & React.PropsWithChildren;

export const ProtocolsGrid = ({ children, gridRef }: Props) => {
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);

  return (
    <div ref={gridRef} css={styles.wrapper(isSidebarOpen)}>
      {children}
    </div>
  );
};
