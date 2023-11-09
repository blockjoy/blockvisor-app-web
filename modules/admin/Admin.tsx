import { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePermissions } from '../../modules/auth';
import { PageLayoutType } from '../../modules/layout/components/page/Page';

const AdminLayout = dynamic<{}>(() =>
  import(`./components/AdminLayout/AdminLayout`).then(
    (module) => module.AdminLayout,
  ),
);

const Sidebar = dynamic<{}>(() =>
  import(`../../modules/layout/components/sidebar/Sidebar`).then(
    (module) => module,
  ),
);

const Burger = dynamic<{}>(() =>
  import(`../../modules/layout/components/burger/Burger`).then(
    (module) => module.Burger,
  ),
);

const Page = dynamic<PageLayoutType>(() =>
  import(`../../modules/layout/components/page/Page`).then((module) => module),
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

  return (
    <Suspense fallback={null}>
      {isSuperUser ? (
        <>
          <Sidebar />
          <Burger />
          <Page>
            <AdminLayout />
          </Page>
        </>
      ) : (
        <NotFound />
      )}
    </Suspense>
  );
};
