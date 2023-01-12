'use client';

import { ReactNode } from 'react';
import { Layout } from '@shared/components';

type Props = {
  children?: ReactNode;
};

export default function ForgotPasswordLayout({ children }: Props) {
  return <Layout title="Forgot Your Password?">{children}</Layout>;
}
