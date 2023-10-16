import { SvgIcon } from '@shared/components';
import { styles } from './AdminDashboardHeadlines.styles';
import IconNode from '@public/assets/icons/app/Node.svg';
import IconUser from '@public/assets/icons/common/Person.svg';
import IconOrganization from '@public/assets/icons/app/Organization.svg';
import IconHost from '@public/assets/icons/app/Host.svg';

const cards = [
  { name: 'Users', value: '2.2k', icon: <IconUser /> },
  { name: 'Nodes', value: '3.8m', icon: <IconNode /> },
  { name: 'Hosts', value: '762', icon: <IconHost /> },
  { name: 'Organizations', value: '427', icon: <IconOrganization /> },
];

export const AdminDashboardHeadlines = () => {
  return (
    <section css={styles.wrapper}>
      {cards.map((card) => (
        <article key={card.name} css={styles.card}>
          <SvgIcon size="24px">{card.icon}</SvgIcon>
          <var css={[styles.cardValue]}>{card.value}</var>
          <h3 css={styles.cardLabel}>{card.name}</h3>
        </article>
      ))}
    </section>
  );
};
