import { useAdminGetTotals } from '@modules/admin/hooks/useAdminGetTotals';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { styles } from './AdminDashboard.styles';
import { AdminDashboardCard } from './AdminDashboardCard/AdminDashboardCard';

type Card = {
  name: 'Nodes' | 'Hosts' | 'Users' | 'Orgs';
  getTotal: () => Promise<number>;
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
    },
    {
      name: 'Hosts',
      getTotal: getTotalHosts,
    },
    {
      name: 'Orgs',
      getTotal: getTotalOrgs,
    },
    {
      name: 'Users',
      getTotal: getTotalUsers,
    },
  ];

  return (
    <div css={styles.wrapper}>
      {cards.map((card) => (
        <AdminDashboardCard
          key={card.name}
          name={card.name}
          getTotal={card.getTotal}
        />
      ))}
    </div>
  );
};
