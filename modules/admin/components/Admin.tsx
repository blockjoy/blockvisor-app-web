import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { usePermissions } from '@modules/auth';

const AdminDashboard = dynamic<{}>(() =>
  import(`./AdminDashboard/AdminDashboard`).then(
    (module) => module.AdminDashboard,
  ),
);

export const Admin = () => {
  const { permissions, isSuperUser } = usePermissions();

  if (permissions !== undefined && !isSuperUser) notFound();

  return <Suspense fallback={null}>{<AdminDashboard />}</Suspense>;
};
