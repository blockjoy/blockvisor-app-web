'use client';
import { Layout } from '@shared/components';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function VerifiedLayout({ children }: Props) {
  return <Layout title="Email being verified.">{children}</Layout>;
}
