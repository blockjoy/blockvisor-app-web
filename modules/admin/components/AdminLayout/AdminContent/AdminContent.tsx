import { AdminDashboard } from '../../AdminDashboard/AdminDashboard';
import { AdminUsers } from '../../AdminUsers/AdminUsers';
import { styles } from './AdminContent.styles';

type Props = {
  tab: string;
};

const views = [
  {
    name: 'dashboard',
    component: <AdminDashboard />,
  },
  {
    name: 'users',
    component: <AdminUsers />,
  },
];

export const AdminContent = ({ tab }: Props) => {
  const component = views?.find((view) => view.name === tab)?.component;

  if (!component) return null;

  return <section css={styles.wrapper}>{component}</section>;
};
