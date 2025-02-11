type SubSidebarItem<T = string> = {
  name?: string;
  title?: string;
  items?: SubSidebarElement<T>[];
};

type SubSidebarElement<T = string> = {
  name?: T;
  title?: string;
  icon?: React.ReactNode;
};
