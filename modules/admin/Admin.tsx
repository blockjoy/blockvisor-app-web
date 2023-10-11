import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { usePermissions } from '@modules/auth';

export const Admin = () => {
  const { isSuperUser } = usePermissions();

  const AdminComponent = dynamic(
    () =>
      import(`./components/AdminLayout/AdminLayout`).then(
        (module) => module.AdminLayout,
      ),
    {
      loading: () => <div>loading</div>,
    },
  );

  return <Suspense fallback={null}>{<AdminComponent />}</Suspense>;
};
