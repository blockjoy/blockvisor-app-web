import React from 'react';
import { styles } from './Page.styles';

type LayoutType = {
  children: React.ReactNode;
};

const Page: React.FC<LayoutType> = ({ children }) => {
  return <div css={[styles.wrapper]}>{children}</div>;
};

export default Page;
