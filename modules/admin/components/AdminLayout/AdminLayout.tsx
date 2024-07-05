import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminSidebar } from '../AdminSidebar/AdminSidebar';
import { styles } from './AdminLayout.styles';
import { wrapper } from 'styles/wrapper.styles';
import { AdminLists } from '../AdminLists/AdminLists';
import { AdminDetails } from '../AdminDetails/AdminDetails';
import { AdminDashboard } from '../AdminDashboard/AdminDashboard';
import { AdminSettings } from '../AdminSettings/AdminSettings';
import { PageTitle } from '@shared/components';
import { layoutSelectors } from '@modules/layout';
import { capitalized } from '@modules/admin/utils/capitalized';
import IconAdmin from '@public/assets/icons/app/Sliders.svg';

type AdminLayoutType = 'dashboard' | 'details' | 'list' | 'settings';

const getType = (
  name?: string | null,
  id?: string | null,
  ip?: string | null,
): AdminLayoutType => {
  if (!name) return 'dashboard';
  return ({
    dashboard: 'dashboard',
    settings: 'settings',
  }[name] || (id || ip ? 'details' : 'list')) as AdminLayoutType;
};

export const AdminLayout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const id = searchParams.get('id');
  const ip = searchParams.get('ip');

  const adminFullWidth = useRecoilValue(layoutSelectors.adminFullWidth);

  useEffect(() => {
    if (!name) {
      router.replace('/admin?name=dashboard');
    }
  }, [name]);

  const type = getType(name, id, ip);

  return (
    <>
      <PageTitle
        isAdmin
        title="Admin"
        icon={<IconAdmin />}
        childTitle={name ? capitalized(name) : ''}
        onTitleClick={
          name ? () => router.push('/admin?name=dashboard') : undefined
        }
        hideOrgPicker
      />
      <section
        css={[styles.wrapper, adminFullWidth ? wrapper.full : wrapper.main]}
      >
        <AdminSidebar tab={name as string} />
        {type === 'dashboard' ? (
          <AdminDashboard />
        ) : type === 'settings' ? (
          <AdminSettings />
        ) : type === 'details' ? (
          <AdminDetails />
        ) : (
          <AdminLists />
        )}
      </section>
    </>
  );
};
