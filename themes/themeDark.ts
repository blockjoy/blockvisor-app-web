import { themeDefault } from './themeDefault';
import { ITheme } from 'types/theme';

export const themeDark: ITheme = {
  ...themeDefault,
  id: 'dark',
  colorPrimary: '#bff589',
  colorPrimaryText: '#222524',
  colorBorder: '#353837',
  colorLabel: '#777a74',
  colorDefault: '#a7a7a7',
  colorActive: '#363938',
  colorHover: '#292b2a',
  colorText: '#f9f9f9',
  colorCard: '#272a29',
  colorPlaceholder: '#A5A8A3',
  colorBackground: '#222524',
  colorLightGrey: '#363938',
};
