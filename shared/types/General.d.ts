type SubSidebarItem = {
  name?: string;
  title?: string;
  items?: SubSidebarElement[];
};

type SubSidebarElement = {
  name?: string;
  title?: string;
  icon?: React.ReactNode;
};
