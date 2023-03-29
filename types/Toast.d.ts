import { ReactNode } from 'react';

type ToastItem = {
  content: string | ReactNode;
  type?: string | 'node' | 'organization';
};
