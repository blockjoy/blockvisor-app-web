'use client';

import { ReactNode } from 'react';
import { Layout } from '@shared/components';

type Props = {
  children?: ReactNode;
};

export default function VerifyLayout({ children }: Props) {
  return (
    <Layout title="We have Sent a Link to Your Email Address.">
      {children}
    </Layout>
  );
}
