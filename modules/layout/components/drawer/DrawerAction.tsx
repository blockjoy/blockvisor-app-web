interface Props {
  children: React.ReactNode;
}

export const DrawerAction: React.FC<Props> = ({ children }) => {
  return <footer>{children}</footer>;
};
