import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { ReactNode } from 'react';

export type GridCell = {
  key: string;
  component: EmotionJSX.Element;
};
