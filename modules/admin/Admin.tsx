import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { usePermissions } from '@modules/auth';

const AdminLayout = dynamic<{}>(() =>
  import(`./components/AdminLayout/AdminLayout`).then(
    (module) => module.AdminLayout,
  ),
);

export const Admin = () => {
  const { permissions, isSuperUser } = usePermissions();

  if (permissions !== undefined && !isSuperUser) notFound();

  return (
    <Suspense fallback={null}>
      <AdminLayout />
    </Suspense>
  );
};
