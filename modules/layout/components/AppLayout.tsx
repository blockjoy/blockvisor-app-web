import Sidebar from "./sidebar/Sidebar";
import Overlay from "./overlay/Overlay";
import Topbar from "./topbar/Topbar";
import Profile from "./profile/Profile";
import NodeAdd from "./nodeAdd/NodeAdd";
import HostAdd from "./hostAdd/HostAdd";
import Page from "./page/Page";
import Breadcrumb from "./breadcrumb/Breadcrumb";

type LayoutType = {
  children: React.ReactNode,
  breadcrumb?: string[]
}

export const AppLayout: React.FC<LayoutType>  = ({ children, breadcrumb }) => {
  return (
   <>
      <Sidebar />
      <Overlay />
      <Topbar />
      <Profile />
      <NodeAdd />
      <HostAdd />
      <Breadcrumb breadcrumb={breadcrumb} />
      <Page>
          {children}
      </Page>
   </>
  );
}
