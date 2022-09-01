import Sidebar from "./sidebar/Sidebar";
import Overlay from "./overlay/Overlay";
import Topbar from "./topbar/Topbar";
import Profile from "./profile/Profile";
import Page from "./page/Page";
import Breadcrumb from "./breadcrumb/Breadcrumb";

type LayoutType = {
  children: React.ReactNode,
  breadcrumb: string[]
}

export const AppLayout: React.FC<LayoutType>  = ({ children, breadcrumb }) => {
  return (
   <>
      <Sidebar />
      <Overlay />
      <Topbar />
      <Profile />
      <Page>
          <Breadcrumb breadcrumb={breadcrumb} />
          {children}
      </Page>
   </>
  );
}
