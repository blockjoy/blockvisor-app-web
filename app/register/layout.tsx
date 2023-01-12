'use client';

import { ReactNode } from 'react';
import { Layout } from '@shared/components';

type Props = {
  children?: ReactNode;
};

export default function RegisterLayout({ children }: Props) {
  return <Layout title="Create Account">{children}</Layout>;
}
