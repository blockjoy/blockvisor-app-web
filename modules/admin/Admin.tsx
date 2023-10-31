import { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePermissions } from '@modules/auth';
import { LayoutProps } from '../../modules/layout/components/AppLayout';

const AdminLayout = dynamic<{}>(() =>
  import(`./components/AdminLayout/AdminLayout`).then(
    (module) => module.AdminLayout,
  ),
);

const AppLayout = dynamic<LayoutProps>(() =>
  import(`../../modules/layout/components/AppLayout`).then(
    (module) => module.AppLayout,
  ),
);

const NotFound = dynamic<{}>(() =>
  import(`../../shared/components/App/NotFound/NotFound`).then(
    (module) => module.NotFound,
  ),
);

export const Admin = () => {
  const { permissions, isSuperUser, getPermissions } = usePermissions();

  useEffect(() => {
    if (permissions === undefined) {
      getPermissions();
    }
  }, []);

  if (permissions === undefined) return null;

  console.log('we never get here');

  return (
    <Suspense fallback={null}>
      {isSuperUser ? (
        <AppLayout pageTitle="Admin">
          <AdminLayout />
        </AppLayout>
      ) : (
        <NotFound />
      )}
    </Suspense>
  );
};
