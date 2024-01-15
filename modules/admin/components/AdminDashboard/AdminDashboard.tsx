import { useAdminGetTotals } from '@modules/admin/hooks/useAdminGetTotals';
import { useRouter } from 'next/router';
import { styles } from './AdminDashboard.styles';
import { AdminDashboardCard } from './AdminDashboardCard/AdminDashboardCard';
import { AdminDashboardNodeProblems } from './AdminDashboardNodeProblems/AdminDashboardNodeProblems';

import IconHost from '@public/assets/icons/app/Host.svg';
import IconNode from '@public/assets/icons/app/Node.svg';
import IconOrg from '@public/assets/icons/app/Organization.svg';
import IconUser from '@public/assets/icons/common/Person.svg';

type Card = {
  name: 'Nodes' | 'Hosts' | 'Users' | 'Orgs';
  getTotal: () => Promise<number>;
  icon: React.ReactNode;
};

export const AdminDashboard = () => {
  const router = useRouter();
  const { name, id } = router.query;

  const { getTotalUsers, getTotalHosts, getTotalNodes, getTotalOrgs } =
    useAdminGetTotals();

  const cards: Card[] = [
    {
      name: 'Nodes',
      getTotal: getTotalNodes,
      icon: <IconNode />,
    },
    {
      name: 'Hosts',
      getTotal: getTotalHosts,
      icon: <IconHost />,
    },
    {
      name: 'Orgs',
      getTotal: getTotalOrgs,
      icon: <IconOrg />,
    },
    {
      name: 'Users',
      getTotal: getTotalUsers,
      icon: <IconUser />,
    },
  ];

  return (
    <section css={styles.wrapper}>
      <div css={styles.grid}>
        {cards.map((card) => (
          <AdminDashboardCard
            key={card.name}
            name={card.name}
            icon={card.icon}
            getTotal={card.getTotal}
          />
        ))}
      </div>
      <AdminDashboardNodeProblems />
    </section>
  );
};
