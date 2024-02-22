import { AdminHeader } from '../AdminHeader/AdminHeader';
import IconCog from '@public/assets/icons/common/Cog.svg';
import IconBilling from '@public/assets/icons/common/Billing.svg';
import { styles } from './AdminSettings.styles';
import { AdminBilling } from './AdminBilling/AdminBilling';
import { AdminSettingsCard } from './AdminSettingsCard/AdminSettingsCard';
import { spacing } from 'styles/utils.spacing.styles';

export const AdminSettings = () => {
  const cards = [
    { name: 'billing', icon: <IconBilling />, component: <AdminBilling /> },
  ];

  return (
    <section css={styles.wrapper}>
      <AdminHeader name="Settings"></AdminHeader>
      <div css={spacing.top.medium}>
        {cards.map((card) => (
          <AdminSettingsCard icon={card.icon} name={card.name}>
            {card.component}
          </AdminSettingsCard>
        ))}
      </div>
    </section>
  );
};
