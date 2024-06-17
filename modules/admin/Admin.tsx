import dynamic from 'next/dynamic';
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

export const Admin = () => {
  return (
    <>
      <Sidebar />
      <Burger />
      <Page>
        <AdminLayout />
      </Page>
    </>
  );
};
