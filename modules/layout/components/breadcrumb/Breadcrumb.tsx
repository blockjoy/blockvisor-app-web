import { layoutState } from '@modules/layout/store/layoutAtoms';
import IconArrow from '@public/assets/icons/arrow-right-12.svg';
import { useRecoilValue } from 'recoil';
import SizedIcon from '../shared/SizedIcon';
import { breadcrumbStyles } from './breadcrumb.styles';

interface LayoutType {
  breadcrumb?: string[];
}

const Breadcrumb: React.FC<LayoutType> = ({ breadcrumb }) => {
  const layout = useRecoilValue(layoutState);

  return (
    <ul
      css={[
        breadcrumbStyles.wrapper,
        layout !== 'sidebar' && breadcrumbStyles.wrapperSidebarOpen,
      ]}
    >
      {breadcrumb?.map((link, index) => (
        <li css={breadcrumbStyles.item} key={link}>
          <span className="breadcrumb-text">{link}</span>
          {index !== breadcrumb.length - 1 ? (
            <SizedIcon size="6px">
              <IconArrow className="breadcrumb-icon" />
            </SizedIcon>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
