import { ITheme } from 'types/theme';
import { themeDefault } from './themeDefault';

export const themeLight: ITheme = {
  ...themeDefault,
  id: 'light',
  colorPrimary: '#222524',
  colorPrimaryText: '#bff589',
  colorAccent: '#13B555',
  colorBorder: '#e7e7e7',
  colorLabel: '#6d6e6c',
  colorDefault: '#5F615D',
  colorActive: '#ebebeb',
  colorText: '#1a1a1a',
  colorCard: '#ffffff',
  colorPlaceholder: '#A5A8A3',
  colorBackground: '#fafafa',
  colorLightGrey: '#f7f7f7',
};
